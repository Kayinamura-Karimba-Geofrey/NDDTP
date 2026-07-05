import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dependent } from '../../database/entities';
import { DependentController } from './dependent.controller';
import { DependentService } from './dependent.service';
import { DependentRepository } from './repositories/dependent.repository';
import { EventsModule } from '../../events/events.module';

@Module({
  imports: [TypeOrmModule.forFeature([Dependent]), EventsModule],
  controllers: [DependentController],
  providers: [DependentService, DependentRepository],
  exports: [DependentService, DependentRepository],
})
export class DependentModule {}
