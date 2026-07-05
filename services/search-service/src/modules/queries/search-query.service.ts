import { Injectable, Logger } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { SearchQueryRepository } from './repositories/search-query.repository';
import { SearchDocumentRepository } from '../documents/repositories/search-document.repository';
import { SearchIndexRepository } from '../indexes/repositories/search-index.repository';
import { EventPublisherService } from '../../events/event-publisher.service';
import { SubmitSearchQueryDto } from './dto/search-query.dto';
import {
  ResourceNotFoundException, InvalidStatusTransitionException, BusinessRuleViolationException,
} from '../../common/exceptions/search.exceptions';
import { QueryStatus, IndexStatus } from '../../common/enums';
import { QUERY_STATUS_TRANSITIONS } from '../../common/constants';

@Injectable()
export class SearchQueryService {
  private readonly logger = new Logger(SearchQueryService.name);
  private readonly maxResults = 50;

  constructor(
    private readonly repo: SearchQueryRepository,
    private readonly documentRepo: SearchDocumentRepository,
    private readonly indexRepo: SearchIndexRepository,
    private readonly publisher: EventPublisherService,
  ) {}

  async submit(requestedBy: string, dto: SubmitSearchQueryDto) {
    if (!dto.query.trim()) {
      throw new BusinessRuleViolationException('Search query cannot be empty');
    }

    if (dto.indexId) {
      const index = await this.indexRepo.findById(dto.indexId);
      if (!index) throw new ResourceNotFoundException('SearchIndex', dto.indexId);
      if (index.status !== IndexStatus.ACTIVE) {
        throw new BusinessRuleViolationException('Search index is not active');
      }
    }

    const queryNumber = `SRH-${Date.now().toString(36).toUpperCase()}-${uuidv4().slice(0, 6).toUpperCase()}`;
    const searchQuery = await this.repo.create({
      queryNumber,
      requestedBy,
      indexId: dto.indexId ?? null,
      query: dto.query.trim(),
      status: QueryStatus.PENDING,
    });

    await this.publisher.publishQuerySubmitted({
      queryId: searchQuery.id, queryNumber, requestedBy, query: dto.query,
    });

    return this.execute(searchQuery.id);
  }

  async execute(id: string) {
    const searchQuery = await this.findById(id);
    this.assertTransition(searchQuery.status, QueryStatus.COMPLETED);

    try {
      const documents = await this.documentRepo.search(
        searchQuery.indexId,
        searchQuery.query,
        this.maxResults,
      );

      const results = documents.map((d, i) => ({
        documentId: d.id,
        title: d.title,
        score: Math.max(1, this.maxResults - i),
      }));

      await this.repo.update(id, {
        status: QueryStatus.COMPLETED,
        hitCount: results.length,
        results,
        completedAt: new Date(),
      });

      await this.publisher.publishQueryCompleted({
        queryId: id, queryNumber: searchQuery.queryNumber, hitCount: results.length,
      });
      this.logger.log(`Search completed: ${searchQuery.queryNumber} (${results.length} hits)`);
    } catch (e) {
      await this.repo.update(id, {
        status: QueryStatus.FAILED,
        errorMessage: (e as Error).message,
      });
      throw e;
    }

    return this.repo.findById(id);
  }

  findAll(page: number, limit: number, status?: QueryStatus) {
    return this.repo.findAll(page, limit, undefined, status);
  }

  findMine(userId: string, page = 1, limit = 20) {
    return this.repo.findAll(page, limit, userId);
  }

  async findById(id: string) {
    const searchQuery = await this.repo.findById(id);
    if (!searchQuery) throw new ResourceNotFoundException('SearchQuery', id);
    return searchQuery;
  }

  private assertTransition(from: QueryStatus, to: QueryStatus) {
    const allowed = QUERY_STATUS_TRANSITIONS[from] || [];
    if (!allowed.includes(to)) throw new InvalidStatusTransitionException(from, to);
  }
}
