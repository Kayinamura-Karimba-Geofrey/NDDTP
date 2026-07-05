import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PersonnelRecordRepository } from './repositories/personnel-record.repository';
import { ServiceHistoryRepository } from './repositories/service-history.repository';
import { EventPublisherService } from '../../events/event-publisher.service';
import { RedisService } from '../cache/redis.module';
import { CACHE_KEYS } from '../../common/constants';
import {
  DuplicateResourceException, ResourceNotFoundException, InvalidStatusTransitionException,
} from '../../common/exceptions/personnel.exceptions';
import { CreatePersonnelRecordDto, UpdatePersonnelRecordDto, CreateServiceHistoryDto } from './dto/personnel.dto';
import { ServiceStatus, ServiceEventType } from '../../common/enums';
import { PersonnelRecord } from '../../database/entities/personnel-record.entity';

const VALID_TRANSITIONS: Record<ServiceStatus, ServiceStatus[]> = {
  [ServiceStatus.ACTIVE]: [ServiceStatus.RESERVE, ServiceStatus.ON_LEAVE, ServiceStatus.SUSPENDED, ServiceStatus.RETIRED, ServiceStatus.SEPARATED],
  [ServiceStatus.RESERVE]: [ServiceStatus.ACTIVE, ServiceStatus.SEPARATED],
  [ServiceStatus.ON_LEAVE]: [ServiceStatus.ACTIVE, ServiceStatus.SUSPENDED],
  [ServiceStatus.SUSPENDED]: [ServiceStatus.ACTIVE, ServiceStatus.SEPARATED],
  [ServiceStatus.RETIRED]: [],
  [ServiceStatus.SEPARATED]: [],
};

@Injectable()
export class PersonnelService {
  private readonly logger = new Logger(PersonnelService.name);

  constructor(
    private readonly repo: PersonnelRecordRepository,
    private readonly historyRepo: ServiceHistoryRepository,
    private readonly publisher: EventPublisherService,
    private readonly redis: RedisService,
    private readonly cs: ConfigService,
  ) {}

  async create(dto: CreatePersonnelRecordDto, correlationId?: string) {
    if (await this.repo.findByUserId(dto.userId)) throw new DuplicateResourceException('userId', dto.userId);
    if (await this.repo.findByServiceNumber(dto.serviceNumber)) throw new DuplicateResourceException('serviceNumber', dto.serviceNumber);

    const record = await this.repo.create(dto);
    await this.publisher.publishRecordCreated({
      personnelId: record.id, userId: record.userId, serviceNumber: record.serviceNumber,
      firstName: record.firstName, lastName: record.lastName,
    }, correlationId);
    this.logger.log(`Personnel record created: ${record.id}`);
    return this.toResponse(record);
  }

  async createFromUserEvent(data: Record<string, unknown>, correlationId?: string) {
    const userId = data.userId as string;
    if (await this.repo.findByUserId(userId)) return null;

    const employeeNumber = data.employeeNumber as string;
    const serviceNumber = `SVC-${employeeNumber || userId.slice(0, 8).toUpperCase()}`;
    return this.create({
      userId,
      serviceNumber,
      employeeNumber,
      firstName: data.firstName as string,
      lastName: data.lastName as string,
      email: data.email as string | undefined,
    }, correlationId);
  }

  async findAll(filter: { page?: number; limit?: number; search?: string; serviceStatus?: ServiceStatus; personnelType?: string; branch?: string }) {
    const result = await this.repo.findAll(
      filter.page || 1, filter.limit || 20, filter.search,
      filter.serviceStatus, filter.personnelType as never, filter.branch as never,
    );
    return { data: result.data.map((r) => this.toResponse(r)), meta: result.meta };
  }

  async findById(id: string) {
    const cached = await this.redis.get(CACHE_KEYS.PERSONNEL(id));
    if (cached) return JSON.parse(cached);

    const record = await this.repo.findById(id);
    if (!record) throw new ResourceNotFoundException('PersonnelRecord', id);

    const response = this.toDetailResponse(record);
    const ttl = this.cs.get<number>('redis.ttl.personnel') || 900;
    await this.redis.set(CACHE_KEYS.PERSONNEL(id), JSON.stringify(response), ttl);
    return response;
  }

  async findByUserId(userId: string) {
    const record = await this.repo.findByUserId(userId);
    if (!record) throw new ResourceNotFoundException('PersonnelRecord', `user:${userId}`);
    return this.findById(record.id);
  }

  async update(id: string, dto: UpdatePersonnelRecordDto, correlationId?: string) {
    const record = await this.repo.findById(id);
    if (!record) throw new ResourceNotFoundException('PersonnelRecord', id);

    if (dto.serviceStatus && dto.serviceStatus !== record.serviceStatus) {
      const allowed = VALID_TRANSITIONS[record.serviceStatus] || [];
      if (!allowed.includes(dto.serviceStatus)) {
        throw new InvalidStatusTransitionException(record.serviceStatus, dto.serviceStatus);
      }
      if (dto.serviceStatus === ServiceStatus.SEPARATED || dto.serviceStatus === ServiceStatus.RETIRED) {
        await this.publisher.publishRecordSeparated({
          personnelId: id, userId: record.userId, serviceStatus: dto.serviceStatus,
        }, correlationId);
      }
    }

    const { serviceStatus, ...rest } = dto;
    const updateData: Record<string, unknown> = { ...rest };
    if (serviceStatus) updateData.serviceStatus = serviceStatus;
    if (serviceStatus === ServiceStatus.SEPARATED || serviceStatus === ServiceStatus.RETIRED) {
      updateData.separationDate = new Date().toISOString().split('T')[0];
    }

    await this.repo.update(id, updateData as Partial<PersonnelRecord>);
    await this.invalidateCache(id, record.userId);
    await this.publisher.publishRecordUpdated({ personnelId: id, userId: record.userId, changes: dto }, correlationId);
    return this.findById(id);
  }

  async syncFromUserEvent(data: Record<string, unknown>) {
    const record = await this.repo.findByUserId(data.userId as string);
    if (!record) return null;
    const updates: Partial<PersonnelRecord> = {};
    if (data.firstName) updates.firstName = data.firstName as string;
    if (data.lastName) updates.lastName = data.lastName as string;
    if (data.email) updates.email = data.email as string;
    if (Object.keys(updates).length) {
      await this.repo.update(record.id, updates);
      await this.invalidateCache(record.id, record.userId);
    }
    return record;
  }

  async deactivateFromUserEvent(userId: string) {
    const record = await this.repo.findByUserId(userId);
    if (!record || record.serviceStatus === ServiceStatus.SEPARATED) return null;
    return this.update(record.id, { serviceStatus: ServiceStatus.SUSPENDED });
  }

  async deleteFromUserEvent(userId: string) {
    const record = await this.repo.findByUserId(userId);
    if (!record) return null;
    await this.repo.softDelete(record.id);
    await this.invalidateCache(record.id, userId);
    return record;
  }

  async addServiceHistory(personnelId: string, dto: CreateServiceHistoryDto, recordedBy?: string, correlationId?: string) {
    const record = await this.repo.findById(personnelId);
    if (!record) throw new ResourceNotFoundException('PersonnelRecord', personnelId);

    const entry = await this.historyRepo.create({
      personnelRecordId: personnelId,
      eventType: dto.eventType as ServiceEventType,
      title: dto.title,
      description: dto.description ?? null,
      eventDate: dto.eventDate,
      referenceNumber: dto.referenceNumber ?? null,
      recordedBy: recordedBy ?? null,
    });

    await this.publisher.publishServiceEventRecorded({
      personnelId, userId: record.userId, eventType: dto.eventType, title: dto.title,
    }, correlationId);
    await this.invalidateCache(personnelId, record.userId);
    return entry;
  }

  async getServiceHistory(personnelId: string, page = 1, limit = 20) {
    const [data, total] = await this.historyRepo.findByPersonnelId(personnelId, page, limit);
    const totalPages = Math.ceil(total / limit);
    return { data, meta: { page, limit, total, totalPages, hasNextPage: page < totalPages, hasPreviousPage: page > 1 } };
  }

  private async invalidateCache(id: string, userId: string) {
    await this.redis.del(CACHE_KEYS.PERSONNEL(id), CACHE_KEYS.PERSONNEL_BY_USER(userId));
  }

  private toResponse(r: PersonnelRecord) {
    return {
      id: r.id, userId: r.userId, serviceNumber: r.serviceNumber, employeeNumber: r.employeeNumber,
      firstName: r.firstName, lastName: r.lastName, email: r.email,
      personnelType: r.personnelType, serviceStatus: r.serviceStatus, branch: r.branch,
      enlistmentDate: r.enlistmentDate, createdAt: r.createdAt,
    };
  }

  private toDetailResponse(r: PersonnelRecord) {
    const currentRank = r.rankHistory?.find((rh) => rh.isCurrent);
    const currentAssignment = r.assignments?.find((a) => a.isCurrent);
    return {
      ...this.toResponse(r),
      bloodGroup: r.bloodGroup, maritalStatus: r.maritalStatus, nationalId: r.nationalId,
      separationDate: r.separationDate, yearsOfService: r.yearsOfService,
      securityClearance: r.securityClearance, notes: r.notes, metadata: r.metadata,
      currentRank: currentRank ? { id: currentRank.rankId, name: currentRank.rank?.name, effectiveDate: currentRank.effectiveDate } : null,
      currentAssignment: currentAssignment ? {
        id: currentAssignment.id, unitId: currentAssignment.unitId,
        unitName: currentAssignment.unit?.name, positionTitle: currentAssignment.positionTitle,
      } : null,
      qualifications: r.qualifications?.map((pq) => ({
        id: pq.id, name: pq.qualification?.name, status: pq.status, expiryDate: pq.expiryDate,
      })) || [],
      updatedAt: r.updatedAt,
    };
  }
}
