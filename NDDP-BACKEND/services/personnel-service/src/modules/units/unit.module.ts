import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Unit } from '../../database/entities';
import { UnitController } from './unit.controller';
import { UnitService } from './unit.service';
import { UnitRepository } from './repositories/unit.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Unit])],
  controllers: [UnitController],
  providers: [UnitService, UnitRepository],
  exports: [UnitRepository, UnitService],
})
export class UnitModule {}
