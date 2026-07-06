import { Module } from '@nestjs/common';

/** @deprecated Health routes are registered via PlatformModule.forRoot(). Kept for import compatibility. */
@Module({})
export class PlatformHealthModule {}
