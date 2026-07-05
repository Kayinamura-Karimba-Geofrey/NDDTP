import { Controller, Get, Post, Param, Query, Body, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { FacilitySpaceService } from './facility-space.service';
import { CreateFacilitySpaceDto, SpaceFilterDto } from './dto/facility-space.dto';
import { RequirePermissions } from '@nddtp/platform-core';

@ApiTags('Facility Spaces')
@ApiBearerAuth('access-token')
@Controller('spaces')
export class FacilitySpaceController {
  constructor(private readonly service: FacilitySpaceService) {}

  @Post()
  @RequirePermissions('facilities:manage:spaces')
  @ApiOperation({ summary: 'Create facility space' })
  create(@Body() dto: CreateFacilitySpaceDto) {
    return this.service.create(dto);
  }

  @Get('available')
  @RequirePermissions('facilities:read:spaces')
  @ApiOperation({ summary: 'List available spaces' })
  findAvailable(@Query('facilityId') facilityId?: string) {
    return this.service.findAvailable(facilityId);
  }

  @Get()
  @RequirePermissions('facilities:read:spaces')
  @ApiOperation({ summary: 'List spaces' })
  findAll(@Query() query: SpaceFilterDto) {
    return this.service.findAll(query);
  }

  @Get(':id')
  @RequirePermissions('facilities:read:spaces')
  @ApiOperation({ summary: 'Get space by ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findById(id);
  }
}
