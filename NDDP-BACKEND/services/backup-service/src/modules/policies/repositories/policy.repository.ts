import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BackupPolicy } from '../../../database/entities/backup-policy.entity';
import { PolicyStatus } from '../../../common/enums';

@Injectable()
export class PolicyRepository {
  constructor(@InjectRepository(BackupPolicy) private readonly repo: Repository<BackupPolicy>) {}

  create(data: Partial<BackupPolicy>) { return this.repo.save(this.repo.create(data)); }
  findById(id: string) { return this.repo.findOne({ where: { id } }); }
  findByCode(code: string) { return this.repo.findOne({ where: { code } }); }
  findActive() { return this.repo.find({ where: { status: PolicyStatus.ACTIVE }, order: { name: 'ASC' } }); }
}
