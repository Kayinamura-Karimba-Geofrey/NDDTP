import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkflowDefinition } from '../../../database/entities/workflow-definition.entity';
import { WorkflowStep } from '../../../database/entities/workflow-step.entity';
import { DefinitionStatus } from '../../../common/enums';

@Injectable()
export class WorkflowDefinitionRepository {
  constructor(
    @InjectRepository(WorkflowDefinition) private readonly defRepo: Repository<WorkflowDefinition>,
    @InjectRepository(WorkflowStep) private readonly stepRepo: Repository<WorkflowStep>,
  ) {}

  async createWithSteps(def: Partial<WorkflowDefinition>, steps: Partial<WorkflowStep>[]) {
    const definition = await this.defRepo.save(this.defRepo.create(def));
    for (const s of steps) {
      await this.stepRepo.save(this.stepRepo.create({ ...s, definitionId: definition.id }));
    }
    return this.findById(definition.id);
  }

  findById(id: string) {
    return this.defRepo.findOne({ where: { id }, relations: ['steps'] });
  }

  findByCode(code: string) {
    return this.defRepo.findOne({ where: { code }, relations: ['steps'] });
  }

  findActive() {
    return this.defRepo.find({
      where: { status: DefinitionStatus.ACTIVE },
      relations: ['steps'],
      order: { name: 'ASC' },
    });
  }
}
