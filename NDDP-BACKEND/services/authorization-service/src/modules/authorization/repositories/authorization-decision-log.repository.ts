import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthorizationDecisionLog } from '../../../database/entities/authorization-decision-log.entity';
import { AuthorizationDecision } from '../../../common/enums';

@Injectable()
export class AuthorizationDecisionLogRepository {
  constructor(@InjectRepository(AuthorizationDecisionLog) private readonly repo: Repository<AuthorizationDecisionLog>) {}

  log(data: Partial<AuthorizationDecisionLog>): Promise<AuthorizationDecisionLog> {
    return this.repo.save(this.repo.create(data));
  }

  findByUserId(userId: string, limit = 50): Promise<AuthorizationDecisionLog[]> {
    return this.repo.find({ where: { userId }, order: { createdAt: 'DESC' }, take: limit });
  }
}
