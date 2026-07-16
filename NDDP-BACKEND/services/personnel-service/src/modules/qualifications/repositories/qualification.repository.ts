import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Qualification } from '../../../database/entities/qualification.entity';
import { PersonnelQualification } from '../../../database/entities/personnel-qualification.entity';

@Injectable()
export class QualificationRepository {
  constructor(@InjectRepository(Qualification) private readonly repo: Repository<Qualification>) {}
  create(data: Partial<Qualification>) { return this.repo.save(this.repo.create(data)); }
  findAll() { return this.repo.find({ where: { isActive: true }, order: { name: 'ASC' } }); }
  findById(id: string) { return this.repo.findOne({ where: { id } }); }
  findByCode(code: string) { return this.repo.findOne({ where: { code } }); }
}

@Injectable()
export class PersonnelQualificationRepository {
  constructor(@InjectRepository(PersonnelQualification) private readonly repo: Repository<PersonnelQualification>) {}
  create(data: Partial<PersonnelQualification>) { return this.repo.save(this.repo.create(data)); }
  findByPersonnel(personnelRecordId: string) {
    return this.repo.find({ where: { personnelRecordId }, relations: ['qualification'], order: { obtainedDate: 'DESC' } });
  }
}
