import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnnouncementCategory } from '../../database/entities/announcement-category.entity';
import { CategoryRepository } from './repositories/category.repository';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { RedisModule } from '../cache/redis.module';
import { EventsModule } from '../../events/events.module';

@Module({
  imports: [TypeOrmModule.forFeature([AnnouncementCategory]), RedisModule, EventsModule],
  controllers: [CategoryController],
  providers: [CategoryRepository, CategoryService],
  exports: [CategoryRepository, CategoryService],
})
export class CategoryModule {}
