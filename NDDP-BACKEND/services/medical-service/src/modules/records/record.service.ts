import { Injectable, Logger } from '@nestjs/common';
import { RecordRepository } from './repositories/record.repository';
import { EventPublisherService } from '../../events/event-publisher.service';
import { ResourceNotFoundException } from '../../common/exceptions/medical.exceptions';
import { CreateRecordDto } from './dto/record.dto';
import { RecordType } from '../../common/enums';

@Injectable()
export class RecordService {
  private readonly logger = new Logger(RecordService.name);

  constructor(
    private readonly repo: RecordRepository,
    private readonly publisher: EventPublisherService,
  ) {}

  async create(recordedBy: string, dto: CreateRecordDto) {
    const record = await this.repo.create({
      userId: dto.userId,
      appointmentId: dto.appointmentId ?? null,
      recordType: dto.recordType,
      title: dto.title,
      diagnosis: dto.diagnosis ?? null,
      notes: dto.notes ?? null,
      metadata: dto.metadata ?? null,
      recordedBy,
      recordedAt: new Date(),
    });

    await this.publisher.publishRecordCreated({
      recordId: record.id, userId: dto.userId, recordType: dto.recordType, title: dto.title, recordedBy,
    });

    this.logger.log(`Medical record created for user ${dto.userId}`);
    return record;
  }

  async findById(id: string) {
    const record = await this.repo.findById(id);
    if (!record) throw new ResourceNotFoundException('MedicalRecord', id);
    return record;
  }

  findAll(filter: { page?: number; limit?: number; userId?: string; recordType?: RecordType }) {
    return this.repo.findAll(filter.page || 1, filter.limit || 20, filter.userId, filter.recordType);
  }

  findMine(userId: string, page = 1, limit = 20) {
    return this.repo.findAll(page, limit, userId);
  }
}
