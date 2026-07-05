import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SemanticModel } from '../../database/entities/semantic-model.entity';
import { SemanticModelRepository } from './repositories/semantic-model.repository';
import { SemanticModelService } from './semantic-model.service';
import { SemanticModelController } from './semantic-model.controller';
import { BiDatasetModule } from '../datasets/dataset.module';
import { EventsModule } from '../../events/events.module';

@Module({
  imports: [TypeOrmModule.forFeature([SemanticModel]), BiDatasetModule, EventsModule],
  controllers: [SemanticModelController],
  providers: [SemanticModelRepository, SemanticModelService],
  exports: [SemanticModelRepository, SemanticModelService],
})
export class SemanticModelModule {}
