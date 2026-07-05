import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { PlatformHealthController } from './platform-health.controller';

@Module({
  imports: [TerminusModule],
  controllers: [PlatformHealthController],
})
export class PlatformHealthModule {}
