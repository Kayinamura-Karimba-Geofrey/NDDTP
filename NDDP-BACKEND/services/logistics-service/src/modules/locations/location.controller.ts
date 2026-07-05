import { Controller, Get, Post, Param, Body, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/location.dto';
import { RequirePermissions } from '@nddtp/platform-core';

@ApiTags('Locations')
@ApiBearerAuth('access-token')
@Controller('locations')
export class LocationController {
  constructor(private readonly service: LocationService) {}

  @Post()
  @RequirePermissions('logistics:manage:locations')
  @ApiOperation({ summary: 'Create logistics location' })
  create(@Body() dto: CreateLocationDto) {
    return this.service.create(dto);
  }

  @Get()
  @RequirePermissions('logistics:read:locations')
  @ApiOperation({ summary: 'List active locations' })
  findActive() {
    return this.service.findActive();
  }

  @Get(':id')
  @RequirePermissions('logistics:read:locations')
  @ApiOperation({ summary: 'Get location by ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findById(id);
  }
}
