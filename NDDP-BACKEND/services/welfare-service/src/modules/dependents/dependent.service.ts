import { Injectable } from '@nestjs/common';
import { DependentRepository } from './repositories/dependent.repository';
import { EventPublisherService } from '../../events/event-publisher.service';
import { ResourceNotFoundException, BusinessRuleViolationException } from '../../common/exceptions/welfare.exceptions';
import { CreateDependentDto, UpdateDependentDto } from './dto/dependent.dto';

@Injectable()
export class DependentService {
  constructor(
    private readonly repo: DependentRepository,
    private readonly publisher: EventPublisherService,
  ) {}

  async create(userId: string, dto: CreateDependentDto) {
    const dependent = await this.repo.create({ ...dto, userId });
    await this.publisher.publishDependentRegistered({
      dependentId: dependent.id, userId, firstName: dependent.firstName, lastName: dependent.lastName,
      relationship: dependent.relationship,
    });
    return dependent;
  }

  findByUser(userId: string) { return this.repo.findByUser(userId); }

  async findById(id: string, userId?: string) {
    const dep = await this.repo.findById(id);
    if (!dep) throw new ResourceNotFoundException('Dependent', id);
    if (userId && dep.userId !== userId) throw new BusinessRuleViolationException('Access denied');
    return dep;
  }

  async update(id: string, userId: string, dto: UpdateDependentDto) {
    await this.findById(id, userId);
    await this.repo.update(id, dto);
    return this.repo.findById(id);
  }

  async remove(id: string, userId: string) {
    await this.findById(id, userId);
    await this.repo.softDelete(id);
    return { deleted: true };
  }
}
