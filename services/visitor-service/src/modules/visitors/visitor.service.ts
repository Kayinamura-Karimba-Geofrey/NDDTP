import { Injectable, Logger } from '@nestjs/common';
import { VisitorRepository } from './repositories/visitor.repository';
import { RedisService } from '../cache/redis.module';
import { EventPublisherService } from '../../events/event-publisher.service';
import { RegisterVisitorDto } from './dto/visitor.dto';
import { DuplicateResourceException, ResourceNotFoundException } from '../../common/exceptions/visitor.exceptions';
import { CACHE_KEYS } from '../../common/constants';
import { VisitorStatus } from '../../common/enums';

@Injectable()
export class VisitorService {
  private readonly logger = new Logger(VisitorService.name);

  constructor(
    private readonly repo: VisitorRepository,
    private readonly redis: RedisService,
    private readonly publisher: EventPublisherService,
  ) {}

  async register(registeredBy: string, dto: RegisterVisitorDto) {
    const existing = await this.repo.findByIdNumber(dto.idNumber);
    if (existing) throw new DuplicateResourceException('idNumber', dto.idNumber);

    const visitor = await this.repo.create({
      idNumber: dto.idNumber,
      firstName: dto.firstName,
      lastName: dto.lastName,
      organization: dto.organization ?? null,
      idDocumentType: dto.idDocumentType,
      phone: dto.phone ?? null,
      email: dto.email ?? null,
      status: VisitorStatus.ACTIVE,
      registeredBy,
    });

    await this.publisher.publishVisitorRegistered({
      visitorId: visitor.id, idNumber: visitor.idNumber, firstName: visitor.firstName, lastName: visitor.lastName,
    });
    this.logger.log(`Visitor registered: ${visitor.idNumber}`);
    return visitor;
  }

  findAll(filter: { page?: number; limit?: number; status?: VisitorStatus }) {
    return this.repo.findAll(filter.page || 1, filter.limit || 20, filter.status);
  }

  async findById(id: string) {
    const visitor = await this.repo.findById(id);
    if (!visitor) throw new ResourceNotFoundException('Visitor', id);
    return visitor;
  }
}
