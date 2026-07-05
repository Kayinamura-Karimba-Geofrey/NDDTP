import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { LeaveTypeService } from './leave-type.service';
import { RequirePermissions } from '@nddtp/platform-core';

@ApiTags('Leave Types')
@ApiBearerAuth('access-token')
@Controller('leave-types')
export class LeaveTypeController {
  constructor(private readonly service: LeaveTypeService) {}

  @Get()
  @RequirePermissions('leave:read:requests')
  @ApiOperation({ summary: 'List leave types' })
  findAll() { return this.service.findAll(); }

  @Get(':id')
  @RequirePermissions('leave:read:requests')
  @ApiOperation({ summary: 'Get leave type by ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) { return this.service.findById(id); }
}
