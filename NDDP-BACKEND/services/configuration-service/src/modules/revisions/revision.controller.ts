import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { RevisionService } from './revision.service';
import { RequirePermissions } from '@nddtp/platform-core';

@ApiTags('Revisions')
@ApiBearerAuth('access-token')
@Controller('revisions')
export class RevisionController {
  constructor(private readonly service: RevisionService) {}

  @Get('entry/:entryId')
  @RequirePermissions('configuration:read:revisions')
  @ApiOperation({ summary: 'List revision history for entry' })
  findByEntry(@Param('entryId', ParseUUIDPipe) entryId: string) {
    return this.service.findByEntry(entryId);
  }
}
