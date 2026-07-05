import { Injectable, Logger } from '@nestjs/common';
import { SemanticModelRepository } from './repositories/semantic-model.repository';
import { BiDatasetRepository } from '../datasets/repositories/dataset.repository';
import { EventPublisherService } from '../../events/event-publisher.service';
import { CreateSemanticModelDto, UpdateModelStatusDto } from './dto/semantic-model.dto';
import { DuplicateResourceException, ResourceNotFoundException, BusinessRuleViolationException } from '../../common/exceptions/bi.exceptions';
import { DatasetStatus, ModelStatus } from '../../common/enums';

@Injectable()
export class SemanticModelService {
  private readonly logger = new Logger(SemanticModelService.name);

  constructor(
    private readonly repo: SemanticModelRepository,
    private readonly datasetRepo: BiDatasetRepository,
    private readonly publisher: EventPublisherService,
  ) {}

  async create(dto: CreateSemanticModelDto) {
    const existing = await this.repo.findByCode(dto.code);
    if (existing) throw new DuplicateResourceException('code', dto.code);

    const dataset = await this.datasetRepo.findById(dto.datasetId);
    if (!dataset) throw new ResourceNotFoundException('BiDataset', dto.datasetId);
    if (dataset.status !== DatasetStatus.ACTIVE) {
      throw new BusinessRuleViolationException('Dataset must be active to create a semantic model');
    }

    const model = await this.repo.create({
      code: dto.code,
      name: dto.name,
      datasetId: dto.datasetId,
      dimensions: dto.dimensions ?? [],
      measures: dto.measures ?? [],
      description: dto.description ?? null,
      status: ModelStatus.DRAFT,
    });

    await this.publisher.publishModelCreated({ modelId: model.id, code: model.code, datasetId: dto.datasetId });
    this.logger.log(`Semantic model created: ${model.code}`);
    return this.repo.findById(model.id);
  }

  findActive() { return this.repo.findActive(); }

  async findById(id: string) {
    const model = await this.repo.findById(id);
    if (!model) throw new ResourceNotFoundException('SemanticModel', id);
    return model;
  }

  async findByDataset(datasetId: string) {
    const dataset = await this.datasetRepo.findById(datasetId);
    if (!dataset) throw new ResourceNotFoundException('BiDataset', datasetId);
    return this.repo.findByDatasetId(datasetId);
  }

  async activate(id: string) {
    const model = await this.findById(id);
    if (model.status === ModelStatus.ACTIVE) {
      throw new BusinessRuleViolationException('Model is already active');
    }
    if (!model.dimensions.length || !model.measures.length) {
      throw new BusinessRuleViolationException('Model must have at least one dimension and one measure');
    }
    await this.repo.update(id, { status: ModelStatus.ACTIVE });
    return this.repo.findById(id);
  }

  async updateStatus(id: string, dto: UpdateModelStatusDto) {
    await this.findById(id);
    await this.repo.update(id, { status: dto.status });
    return this.repo.findById(id);
  }
}
