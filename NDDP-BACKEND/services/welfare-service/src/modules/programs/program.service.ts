import { Injectable } from '@nestjs/common';
import { ProgramRepository } from './repositories/program.repository';
import { EventPublisherService } from '../../events/event-publisher.service';
import { RedisService } from '../cache/redis.module';
import { CACHE_KEYS } from '../../common/constants';
import { DuplicateResourceException, ResourceNotFoundException } from '../../common/exceptions/welfare.exceptions';
import { CreateProgramDto } from './dto/program.dto';

@Injectable()
export class ProgramService {
  constructor(
    private readonly repo: ProgramRepository,
    private readonly publisher: EventPublisherService,
    private readonly redis: RedisService,
  ) {}

  async create(dto: CreateProgramDto) {
    if (await this.repo.findByCode(dto.code)) throw new DuplicateResourceException('code', dto.code);
    const program = await this.repo.create(dto);
    await this.redis.del(CACHE_KEYS.ACTIVE_PROGRAMS);
    await this.publisher.publishProgramCreated({ programId: program.id, code: program.code, name: program.name });
    return program;
  }

  async findActive() {
    const cached = await this.redis.get(CACHE_KEYS.ACTIVE_PROGRAMS);
    if (cached) return JSON.parse(cached);
    const programs = await this.repo.findActive();
    await this.redis.set(CACHE_KEYS.ACTIVE_PROGRAMS, JSON.stringify(programs), 600);
    return programs;
  }

  findAll() { return this.repo.findAll(); }

  async findById(id: string) {
    const program = await this.repo.findById(id);
    if (!program) throw new ResourceNotFoundException('WelfareProgram', id);
    return program;
  }
}
