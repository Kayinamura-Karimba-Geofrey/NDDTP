import { Controller, Get, Post, Param, Body, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ReportDefinitionService } from './report-definition.service';
import { CreateReportDefinitionDto } from './dto/report-definition.dto';
import { RequirePermissions } from '@nddtp/platform-core';

@ApiTags('Report Definitions')
@ApiBearerAuth('access-token')
@Controller('definitions')
export class ReportDefinitionController {
  constructor(private readonly service: ReportDefinitionService) {}

  @Post()
  @RequirePermissions('reporting:manage:definitions')
  @ApiOperation({ summary: 'Create report definition' })
  create(@Body() dto: CreateReportDefinitionDto) {
    return this.service.create(dto);
  }

  @Get()
  @RequirePermissions('reporting:read:definitions')
  @ApiOperation({ summary: 'List active report definitions' })
  findActive() {
    return this.service.findActive();
  }

  @Get(':id')
  @RequirePermissions('reporting:read:definitions')
  @ApiOperation({ summary: 'Get report definition by ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findById(id);
  }
}
