import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SearchIndex } from '../../database/entities/search-index.entity';
import { SearchIndexRepository } from './repositories/search-index.repository';
import { SearchIndexService } from './search-index.service';
import { SearchIndexController } from './search-index.controller';
import { RedisModule } from '../cache/redis.module';
import { EventsModule } from '../../events/events.module';

@Module({
  imports: [TypeOrmModule.forFeature([SearchIndex]), RedisModule, EventsModule],
  controllers: [SearchIndexController],
  providers: [SearchIndexRepository, SearchIndexService],
  exports: [SearchIndexRepository, SearchIndexService],
})
export class SearchIndexModule {}
