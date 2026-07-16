import { Controller, Get, Post, Param, Query, Body, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { VehicleService } from './vehicle.service';
import { CreateVehicleDto, UpdateVehicleStatusDto, VehicleFilterDto } from './dto/vehicle.dto';
import { RequirePermissions } from '@nddtp/platform-core';

@ApiTags('Vehicles')
@ApiBearerAuth('access-token')
@Controller('vehicles')
export class VehicleController {
  constructor(private readonly service: VehicleService) {}

  @Post()
  @RequirePermissions('fleet:manage:vehicles')
  @ApiOperation({ summary: 'Register vehicle' })
  register(@Body() dto: CreateVehicleDto) {
    return this.service.register(dto);
  }

  @Get()
  @RequirePermissions('fleet:read:vehicles')
  @ApiOperation({ summary: 'List vehicles' })
  findAll(@Query() query: VehicleFilterDto) {
    return this.service.findAll(query);
  }

  @Get(':id')
  @RequirePermissions('fleet:read:vehicles')
  @ApiOperation({ summary: 'Get vehicle by ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findById(id);
  }

  @Post(':id/available')
  @RequirePermissions('fleet:manage:vehicles')
  @ApiOperation({ summary: 'Mark vehicle available' })
  makeAvailable(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.makeAvailable(id);
  }

  @Post(':id/status')
  @RequirePermissions('fleet:manage:vehicles')
  @ApiOperation({ summary: 'Update vehicle status' })
  updateStatus(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateVehicleStatusDto) {
    return this.service.updateStatus(id, dto);
  }
}
