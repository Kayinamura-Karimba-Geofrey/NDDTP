import { Controller, Get, Post, Patch, Param, Body, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { UnitService } from './unit.service';
import { CreateUnitDto, UpdateUnitDto } from './dto/unit.dto';
import { RequirePermissions } from '@nddtp/platform-core';

@ApiTags('Units')
@ApiBearerAuth('access-token')
@Controller('units')
export class UnitController {
  constructor(private readonly service: UnitService) {}

  @Post()
  @RequirePermissions('personnel:write:profile')
  @ApiOperation({ summary: 'Create organizational unit' })
  create(@Body() dto: CreateUnitDto) { return this.service.create(dto); }

  @Get()
  @RequirePermissions('personnel:read:profile')
  @ApiOperation({ summary: 'List all units' })
  findAll() { return this.service.findAll(); }

  @Get(':id')
  @RequirePermissions('personnel:read:profile')
  @ApiOperation({ summary: 'Get unit by ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) { return this.service.findById(id); }

  @Patch(':id')
  @RequirePermissions('personnel:write:profile')
  @ApiOperation({ summary: 'Update unit' })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateUnitDto) {
    return this.service.update(id, dto);
  }
}
