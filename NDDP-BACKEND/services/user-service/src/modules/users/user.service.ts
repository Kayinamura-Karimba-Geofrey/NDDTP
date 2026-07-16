import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserRepository } from './repositories/user.repository';
import { DepartmentRepository } from '../departments/repositories/department.repository';
import { UserAddressRepository, UserEmergencyContactRepository } from './repositories/user-address.repository';
import { CreateUserDto, UpdateUserDto, UserFilterDto, CreateAddressDto, CreateEmergencyContactDto } from './dto/user.dto';
import { EventPublisherService } from '../../events/event-publisher.service';
import { RedisService } from '../cache/redis.module';
import { CACHE_KEYS } from '../../common/constants';
import {
  DuplicateResourceException,
  ResourceNotFoundException,
  InvalidStatusTransitionException,
} from '../../common/exceptions/user.exceptions';
import { UserStatus } from '../../common/enums';
import { User } from '../../database/entities/user.entity';

const VALID_TRANSITIONS: Record<UserStatus, UserStatus[]> = {
  [UserStatus.PENDING]: [UserStatus.ACTIVE, UserStatus.INACTIVE],
  [UserStatus.ACTIVE]: [UserStatus.INACTIVE, UserStatus.SUSPENDED, UserStatus.TERMINATED],
  [UserStatus.INACTIVE]: [UserStatus.ACTIVE, UserStatus.TERMINATED],
  [UserStatus.SUSPENDED]: [UserStatus.ACTIVE, UserStatus.TERMINATED],
  [UserStatus.TERMINATED]: [],
};

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    private readonly userRepo: UserRepository,
    private readonly deptRepo: DepartmentRepository,
    private readonly addressRepo: UserAddressRepository,
    private readonly emergencyRepo: UserEmergencyContactRepository,
    private readonly eventPublisher: EventPublisherService,
    private readonly redis: RedisService,
    private readonly cs: ConfigService,
  ) {}

  async create(dto: CreateUserDto, correlationId?: string) {
    if (await this.userRepo.findByEmail(dto.email)) throw new DuplicateResourceException('email', dto.email);
    if (await this.userRepo.findByEmployeeNumber(dto.employeeNumber)) {
      throw new DuplicateResourceException('employeeNumber', dto.employeeNumber);
    }
    if (dto.departmentId) {
      const dept = await this.deptRepo.findById(dto.departmentId);
      if (!dept) throw new ResourceNotFoundException('Department', dto.departmentId);
    }

    const user = await this.userRepo.create({ ...dto, status: UserStatus.PENDING });

    await this.eventPublisher.publishUserCreated({
      userId: user.id,
      email: user.email,
      employeeNumber: user.employeeNumber,
      firstName: user.firstName,
      lastName: user.lastName,
    }, correlationId);

    this.logger.log(`User created: ${user.id}`);
    return this.toResponse(user);
  }

  async findAll(filter: UserFilterDto) {
    const result = await this.userRepo.findAll(
      filter.page || 1, filter.limit || 20, filter.search, filter.status, filter.departmentId,
    );
    return { data: result.data.map((u) => this.toResponse(u)), meta: result.meta };
  }

  async findById(id: string) {
    const cached = await this.redis.get(CACHE_KEYS.USER(id));
    if (cached) return JSON.parse(cached);

    const user = await this.userRepo.findById(id);
    if (!user) throw new ResourceNotFoundException('User', id);

    const response = this.toDetailResponse(user);
    const ttl = this.cs.get<number>('redis.ttl.user') || 900;
    await this.redis.set(CACHE_KEYS.USER(id), JSON.stringify(response), ttl);
    return response;
  }

  async update(id: string, dto: UpdateUserDto, correlationId?: string) {
    const user = await this.userRepo.findById(id);
    if (!user) throw new ResourceNotFoundException('User', id);

    if (dto.email && dto.email.toLowerCase() !== user.email) {
      const existing = await this.userRepo.findByEmail(dto.email);
      if (existing) throw new DuplicateResourceException('email', dto.email);
    }

    if (dto.status && dto.status !== user.status) {
      if (!VALID_TRANSITIONS[user.status]?.includes(dto.status)) {
        throw new InvalidStatusTransitionException(user.status, dto.status);
      }
    }

    await this.userRepo.update(id, dto);
    await this.invalidateCache(id, user.email);

    await this.eventPublisher.publishUserUpdated({ userId: id, changes: dto }, correlationId);

    if (dto.status === UserStatus.INACTIVE) {
      await this.eventPublisher.publishUserDeactivated({ userId: id }, correlationId);
    } else if (dto.status === UserStatus.ACTIVE && user.status === UserStatus.INACTIVE) {
      await this.eventPublisher.publishUserReactivated({ userId: id }, correlationId);
    }

    return this.findById(id);
  }

  async deactivate(id: string, correlationId?: string) {
    return this.update(id, { status: UserStatus.INACTIVE }, correlationId);
  }

  async delete(id: string, correlationId?: string) {
    const user = await this.userRepo.findById(id);
    if (!user) throw new ResourceNotFoundException('User', id);

    await this.userRepo.softDelete(id);
    await this.invalidateCache(id, user.email);

    await this.eventPublisher.publishUserDeleted({ userId: id, email: user.email }, correlationId);
    return { message: 'User deleted successfully' };
  }

  async addAddress(userId: string, dto: CreateAddressDto) {
    const user = await this.userRepo.findById(userId);
    if (!user) throw new ResourceNotFoundException('User', userId);
    if (dto.isPrimary) await this.addressRepo.clearPrimary(userId);
    const address = await this.addressRepo.create({ userId, ...dto });
    await this.redis.del(CACHE_KEYS.USER(userId));
    return address;
  }

  async addEmergencyContact(userId: string, dto: CreateEmergencyContactDto) {
    const user = await this.userRepo.findById(userId);
    if (!user) throw new ResourceNotFoundException('User', userId);
    const contact = await this.emergencyRepo.create({ userId, ...dto });
    await this.redis.del(CACHE_KEYS.USER(userId));
    return contact;
  }

  async getMe(userId: string) {
    return this.findById(userId);
  }

  private async invalidateCache(id: string, email: string) {
    await this.redis.del(CACHE_KEYS.USER(id));
    await this.redis.del(CACHE_KEYS.USER_BY_EMAIL(email));
  }

  private toResponse(user: User) {
    return {
      id: user.id,
      employeeNumber: user.employeeNumber,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      status: user.status,
      hasCredentials: user.hasCredentials,
      departmentId: user.departmentId,
      jobTitle: user.jobTitle,
      rank: user.rank,
      createdAt: user.createdAt,
    };
  }

  private toDetailResponse(user: User) {
    return {
      ...this.toResponse(user),
      middleName: user.middleName,
      phone: user.phone,
      alternatePhone: user.alternatePhone,
      dateOfBirth: user.dateOfBirth,
      gender: user.gender,
      nationality: user.nationality,
      supervisorId: user.supervisorId,
      hireDate: user.hireDate,
      profilePhotoUrl: user.profilePhotoUrl,
      credentialsRegisteredAt: user.credentialsRegisteredAt,
      department: user.department ? { id: user.department.id, code: user.department.code, name: user.department.name } : null,
      addresses: user.addresses || [],
      emergencyContacts: user.emergencyContacts || [],
      metadata: user.metadata,
      updatedAt: user.updatedAt,
    };
  }
}
