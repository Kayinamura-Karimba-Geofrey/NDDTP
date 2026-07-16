import { Controller, Get, Post, Param, Body, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { WarehouseService } from './warehouse.service';
import { CreateWarehouseDto } from './dto/warehouse.dto';
import { RequirePermissions } from '@nddtp/platform-core';

@ApiTags('Warehouses')
@ApiBearerAuth('access-token')
@Controller('warehouses')
export class WarehouseController {
  constructor(private readonly service: WarehouseService) {}

  @Post()
  @RequirePermissions('inventory:manage:warehouses')
  @ApiOperation({ summary: 'Create warehouse' })
  create(@Body() dto: CreateWarehouseDto) {
    return this.service.create(dto);
  }

  @Get()
  @RequirePermissions('inventory:read:warehouses')
  @ApiOperation({ summary: 'List active warehouses' })
  findActive() {
    return this.service.findActive();
  }

  @Get(':id')
  @RequirePermissions('inventory:read:warehouses')
  @ApiOperation({ summary: 'Get warehouse by ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findById(id);
  }
}
