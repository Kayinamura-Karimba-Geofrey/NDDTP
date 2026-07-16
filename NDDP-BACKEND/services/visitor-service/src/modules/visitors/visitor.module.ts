import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Visitor } from '../../database/entities/visitor.entity';
import { VisitorController } from './visitor.controller';
import { VisitorService } from './visitor.service';
import { VisitorRepository } from './repositories/visitor.repository';
import { EventsModule } from '../../events/events.module';

@Module({
  imports: [TypeOrmModule.forFeature([Visitor]), EventsModule],
  controllers: [VisitorController],
  providers: [VisitorService, VisitorRepository],
  exports: [VisitorRepository, VisitorService],
})
export class VisitorModule {}
