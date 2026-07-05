import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CriteriaService } from './criteria.service';
import { RequirePermissions } from '@nddtp/platform-core';

@ApiTags('Rating Criteria')
@ApiBearerAuth('access-token')
@Controller('criteria')
export class CriteriaController {
  constructor(private readonly service: CriteriaService) {}

  @Get()
  @RequirePermissions('performance:read:reviews')
  @ApiOperation({ summary: 'List active rating criteria' })
  findActive() {
    return this.service.findActive();
  }

  @Get(':id')
  @RequirePermissions('performance:read:reviews')
  @ApiOperation({ summary: 'Get criteria by ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findById(id);
  }
}
