import { Injectable, Logger } from '@nestjs/common';
import { SearchDocumentRepository } from './repositories/search-document.repository';
import { SearchIndexRepository } from '../indexes/repositories/search-index.repository';
import { EventPublisherService } from '../../events/event-publisher.service';
import { IndexDocumentDto, UpdateDocumentDto } from './dto/search-document.dto';
import {
  DuplicateResourceException, ResourceNotFoundException, BusinessRuleViolationException,
} from '../../common/exceptions/search.exceptions';
import { IndexStatus, DocumentStatus } from '../../common/enums';

@Injectable()
export class SearchDocumentService {
  private readonly logger = new Logger(SearchDocumentService.name);

  constructor(
    private readonly repo: SearchDocumentRepository,
    private readonly indexRepo: SearchIndexRepository,
    private readonly publisher: EventPublisherService,
  ) {}

  async index(dto: IndexDocumentDto) {
    const index = await this.indexRepo.findById(dto.indexId);
    if (!index) throw new ResourceNotFoundException('SearchIndex', dto.indexId);
    if (index.status !== IndexStatus.ACTIVE) {
      throw new BusinessRuleViolationException('Search index is not active');
    }

    const existing = await this.repo.findByIndexAndExternalId(dto.indexId, dto.externalId);
    if (existing && existing.status !== DocumentStatus.DELETED) {
      throw new DuplicateResourceException('externalId', dto.externalId);
    }

    const doc = await this.repo.create({
      indexId: dto.indexId,
      externalId: dto.externalId,
      title: dto.title,
      content: dto.content,
      metadata: dto.metadata ?? null,
      status: DocumentStatus.INDEXED,
      indexedAt: new Date(),
    });

    await this.publisher.publishDocumentIndexed({
      documentId: doc.id, indexId: dto.indexId, externalId: dto.externalId,
    });
    this.logger.log(`Document indexed: ${dto.externalId} in ${index.code}`);
    return this.repo.findById(doc.id);
  }

  async update(id: string, dto: UpdateDocumentDto) {
    const doc = await this.findById(id);
    if (doc.status !== DocumentStatus.INDEXED) {
      throw new BusinessRuleViolationException('Only indexed documents can be updated');
    }
    await this.repo.update(id, {
      title: dto.title ?? doc.title,
      content: dto.content ?? doc.content,
      metadata: dto.metadata ?? doc.metadata,
      indexedAt: new Date(),
    });
    return this.repo.findById(id);
  }

  async remove(id: string) {
    const doc = await this.findById(id);
    await this.repo.update(id, { status: DocumentStatus.DELETED });
    await this.publisher.publishDocumentDeleted({
      documentId: id, indexId: doc.indexId, externalId: doc.externalId,
    });
    return this.repo.findById(id);
  }

  findByIndex(indexId: string, page = 1, limit = 20) {
    return this.repo.findByIndex(indexId, page, limit);
  }

  async findById(id: string) {
    const doc = await this.repo.findById(id);
    if (!doc) throw new ResourceNotFoundException('SearchDocument', id);
    return doc;
  }
}
