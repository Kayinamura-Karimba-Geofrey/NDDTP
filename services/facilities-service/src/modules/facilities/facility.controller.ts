import { Controller, Get, Post, Param, Query, Body, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { FacilityService } from './facility.service';
import { CreateFacilityDto, FacilityFilterDto } from './dto/facility.dto';
import { RequirePermissions } from '@nddtp/platform-core';

@ApiTags('Facilities')
@ApiBearerAuth('access-token')
@Controller('facilities')
export class FacilityController {
  constructor(private readonly service: FacilityService) {}

  @Post()
  @RequirePermissions('facilities:manage:facilities')
  @ApiOperation({ summary: 'Register facility' })
  create(@Body() dto: CreateFacilityDto) {
    return this.service.create(dto);
  }

  @Get('active')
  @RequirePermissions('facilities:read:facilities')
  @ApiOperation({ summary: 'List active facilities' })
  findActive() {
    return this.service.findActive();
  }

  @Get()
  @RequirePermissions('facilities:read:facilities')
  @ApiOperation({ summary: 'List facilities' })
  findAll(@Query() query: FacilityFilterDto) {
    return this.service.findAll(query);
  }

  @Get(':id')
  @RequirePermissions('facilities:read:facilities')
  @ApiOperation({ summary: 'Get facility by ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findById(id);
  }
}
