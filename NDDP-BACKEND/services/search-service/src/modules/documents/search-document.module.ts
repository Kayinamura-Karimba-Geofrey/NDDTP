import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SearchDocument } from '../../database/entities/search-document.entity';
import { SearchDocumentRepository } from './repositories/search-document.repository';
import { SearchDocumentService } from './search-document.service';
import { SearchDocumentController } from './search-document.controller';
import { SearchIndexModule } from '../indexes/search-index.module';
import { EventsModule } from '../../events/events.module';

@Module({
  imports: [TypeOrmModule.forFeature([SearchDocument]), SearchIndexModule, EventsModule],
  controllers: [SearchDocumentController],
  providers: [SearchDocumentRepository, SearchDocumentService],
  exports: [SearchDocumentRepository, SearchDocumentService],
})
export class SearchDocumentModule {}
