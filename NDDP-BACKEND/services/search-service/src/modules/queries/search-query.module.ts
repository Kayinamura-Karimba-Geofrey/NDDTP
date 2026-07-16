import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SearchQuery } from '../../database/entities/search-query.entity';
import { SearchQueryRepository } from './repositories/search-query.repository';
import { SearchQueryService } from './search-query.service';
import { SearchQueryController } from './search-query.controller';
import { SearchDocumentModule } from '../documents/search-document.module';
import { SearchIndexModule } from '../indexes/search-index.module';
import { EventsModule } from '../../events/events.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([SearchQuery]),
    SearchDocumentModule,
    SearchIndexModule,
    EventsModule,
  ],
  controllers: [SearchQueryController],
  providers: [SearchQueryRepository, SearchQueryService],
})
export class SearchQueryModule {}
