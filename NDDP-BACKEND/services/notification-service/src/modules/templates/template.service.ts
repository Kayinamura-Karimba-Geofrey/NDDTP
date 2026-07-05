import { Injectable } from '@nestjs/common';
import { TemplateRepository } from './repositories/template.repository';
import { TemplateRendererService } from '../delivery/template-renderer.service';
import { CreateTemplateDto, UpdateTemplateDto, TemplateFilterDto } from '../notifications/dto/notification.dto';
import { DuplicateResourceException, ResourceNotFoundException } from '../../common/exceptions/notification.exceptions';
import { HttpException, HttpStatus } from '@nestjs/common';
import { TemplateStatus } from '../../common/enums';
import { RedisService } from '../cache/redis.module';
import { CACHE_KEYS } from '../../common/constants';

@Injectable()
export class TemplateService {
  constructor(
    private readonly repo: TemplateRepository,
    private readonly renderer: TemplateRendererService,
    private readonly redis: RedisService,
  ) {}

  async create(dto: CreateTemplateDto) {
    if (await this.repo.findByCode(dto.code)) throw new DuplicateResourceException('code', dto.code);
    const variables = dto.variables || this.renderer.extractVariables(`${dto.subject || ''} ${dto.body}`);
    const template = await this.repo.create({ ...dto, variables, status: TemplateStatus.ACTIVE, isSystem: false });
    return this.toResponse(template);
  }

  async findAll(filter: TemplateFilterDto) {
    const result = await this.repo.findAll(filter.page || 1, filter.limit || 20, filter.channel);
    return { data: result.data.map((t) => this.toResponse(t)), meta: result.meta };
  }

  async findByCode(code: string) {
    const cached = await this.redis.get(CACHE_KEYS.TEMPLATE(code));
    if (cached) return JSON.parse(cached);

    const template = await this.repo.findByCode(code);
    if (!template) throw new ResourceNotFoundException('Template', code);

    const response = this.toResponse(template);
    await this.redis.set(CACHE_KEYS.TEMPLATE(code), JSON.stringify(response), 3600);
    return response;
  }

  async update(id: string, dto: UpdateTemplateDto) {
    const template = await this.repo.findById(id);
    if (!template) throw new ResourceNotFoundException('Template', id);
    await this.repo.update(id, dto as Record<string, unknown>);
    await this.redis.del(CACHE_KEYS.TEMPLATE(template.code));
    return this.findByCode(template.code);
  }

  async delete(id: string) {
    const template = await this.repo.findById(id);
    if (!template) throw new ResourceNotFoundException('Template', id);
    if (template.isSystem) {
      throw new HttpException('Cannot delete system template', HttpStatus.FORBIDDEN);
    }
    await this.repo.softDelete(id);
    await this.redis.del(CACHE_KEYS.TEMPLATE(template.code));
    return { message: 'Template deleted' };
  }

  private toResponse(t: { id: string; code: string; name: string; channel: string; subject: string | null; body: string; variables: string[] | null; status: string; isSystem: boolean }) {
    return {
      id: t.id, code: t.code, name: t.name, channel: t.channel,
      subject: t.subject, body: t.body, variables: t.variables,
      status: t.status, isSystem: t.isSystem,
    };
  }
}
