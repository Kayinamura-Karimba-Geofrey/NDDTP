import { Module } from '@nestjs/common';
import { RevisionService } from './revision.service';
import { RevisionController } from './revision.controller';
import { ConfigEntryModule } from '../entries/config-entry.module';

@Module({
  imports: [ConfigEntryModule],
  controllers: [RevisionController],
  providers: [RevisionService],
})
export class RevisionModule {}
