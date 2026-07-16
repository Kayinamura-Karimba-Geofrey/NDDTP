import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WelfareProgram } from '../../database/entities';
import { ProgramController } from './program.controller';
import { ProgramService } from './program.service';
import { ProgramRepository } from './repositories/program.repository';
import { EventsModule } from '../../events/events.module';

@Module({
  imports: [TypeOrmModule.forFeature([WelfareProgram]), EventsModule],
  controllers: [ProgramController],
  providers: [ProgramService, ProgramRepository],
  exports: [ProgramService, ProgramRepository],
})
export class ProgramModule {}
