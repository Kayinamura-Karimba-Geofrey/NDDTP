import { Controller, Get, Post, Param, Body, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { VisitSiteService } from './visit-site.service';
import { CreateVisitSiteDto } from './dto/visit-site.dto';
import { RequirePermissions } from '@nddtp/platform-core';

@ApiTags('Visit Sites')
@ApiBearerAuth('access-token')
@Controller('sites')
export class VisitSiteController {
  constructor(private readonly service: VisitSiteService) {}

  @Post()
  @RequirePermissions('visitor:manage:sites')
  @ApiOperation({ summary: 'Create visit site' })
  create(@Body() dto: CreateVisitSiteDto) {
    return this.service.create(dto);
  }

  @Get()
  @RequirePermissions('visitor:read:sites')
  @ApiOperation({ summary: 'List active visit sites' })
  findActive() {
    return this.service.findActive();
  }

  @Get(':id')
  @RequirePermissions('visitor:read:sites')
  @ApiOperation({ summary: 'Get visit site by ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findById(id);
  }
}
