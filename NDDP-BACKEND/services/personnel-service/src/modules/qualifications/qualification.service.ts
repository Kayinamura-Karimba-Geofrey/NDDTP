import { Injectable } from '@nestjs/common';
import { QualificationRepository, PersonnelQualificationRepository } from './repositories/qualification.repository';
import { PersonnelRecordRepository } from '../personnel/repositories/personnel-record.repository';
import { EventPublisherService } from '../../events/event-publisher.service';
import { DuplicateResourceException, ResourceNotFoundException } from '../../common/exceptions/personnel.exceptions';
import { CreateQualificationDto, AddPersonnelQualificationDto } from './dto/qualification.dto';

@Injectable()
export class QualificationService {
  constructor(
    private readonly qualRepo: QualificationRepository,
    private readonly pqRepo: PersonnelQualificationRepository,
    private readonly personnelRepo: PersonnelRecordRepository,
    private readonly publisher: EventPublisherService,
  ) {}

  async create(dto: CreateQualificationDto) {
    if (await this.qualRepo.findByCode(dto.code)) throw new DuplicateResourceException('code', dto.code);
    return this.qualRepo.create(dto);
  }

  findAll() { return this.qualRepo.findAll(); }

  async addToPersonnel(personnelId: string, dto: AddPersonnelQualificationDto, correlationId?: string) {
    const personnel = await this.personnelRepo.findById(personnelId);
    if (!personnel) throw new ResourceNotFoundException('PersonnelRecord', personnelId);
    const qual = await this.qualRepo.findById(dto.qualificationId);
    if (!qual) throw new ResourceNotFoundException('Qualification', dto.qualificationId);

    let expiryDate = dto.expiryDate ?? null;
    if (!expiryDate && qual.validityMonths) {
      const d = new Date(dto.obtainedDate);
      d.setMonth(d.getMonth() + qual.validityMonths);
      expiryDate = d.toISOString().split('T')[0];
    }

    const entry = await this.pqRepo.create({
      personnelRecordId: personnelId,
      qualificationId: dto.qualificationId,
      obtainedDate: dto.obtainedDate,
      expiryDate,
      certificationNumber: dto.certificationNumber ?? null,
      issuingAuthority: dto.issuingAuthority ?? null,
    });

    await this.publisher.publishQualificationAdded({
      personnelId, userId: personnel.userId, qualificationId: qual.id, qualificationName: qual.name,
    }, correlationId);

    return entry;
  }

  getByPersonnel(personnelId: string) {
    return this.pqRepo.findByPersonnel(personnelId);
  }
}
