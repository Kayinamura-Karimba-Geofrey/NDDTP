import { Controller, Get, Post, Param, Body, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { VehicleTypeService } from './vehicle-type.service';
import { CreateVehicleTypeDto } from './dto/vehicle-type.dto';
import { RequirePermissions } from '@nddtp/platform-core';

@ApiTags('Vehicle Types')
@ApiBearerAuth('access-token')
@Controller('types')
export class VehicleTypeController {
  constructor(private readonly service: VehicleTypeService) {}

  @Post()
  @RequirePermissions('fleet:manage:types')
  @ApiOperation({ summary: 'Create vehicle type' })
  create(@Body() dto: CreateVehicleTypeDto) {
    return this.service.create(dto);
  }

  @Get()
  @RequirePermissions('fleet:read:types')
  @ApiOperation({ summary: 'List active vehicle types' })
  findActive() {
    return this.service.findActive();
  }

  @Get(':id')
  @RequirePermissions('fleet:read:types')
  @ApiOperation({ summary: 'Get vehicle type by ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findById(id);
  }
}
