import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigNamespace } from '../../../database/entities/config-namespace.entity';
import { NamespaceStatus } from '../../../common/enums';

@Injectable()
export class NamespaceRepository {
  constructor(@InjectRepository(ConfigNamespace) private readonly repo: Repository<ConfigNamespace>) {}

  create(data: Partial<ConfigNamespace>) { return this.repo.save(this.repo.create(data)); }
  findById(id: string) { return this.repo.findOne({ where: { id } }); }
  findByCode(code: string) { return this.repo.findOne({ where: { code } }); }
  findActive() { return this.repo.find({ where: { status: NamespaceStatus.ACTIVE }, order: { name: 'ASC' } }); }
}
