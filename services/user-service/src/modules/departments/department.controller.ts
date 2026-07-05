import {
  Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, ParseUUIDPipe, HttpCode, HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto, UpdateDepartmentDto, DepartmentFilterDto } from './dto/department.dto';
import { JwtAuthGuard, PermissionsGuard } from '@nddtp/platform-core';
import { RequirePermissions } from '@nddtp/platform-core';

@ApiTags('Departments')
@Controller('departments')
@UseGuards(JwtAuthGuard, PermissionsGuard)
@ApiBearerAuth()
export class DepartmentController {
  constructor(private readonly deptService: DepartmentService) {}

  @Post()
  @RequirePermissions('personnel:write:profile')
  @ApiOperation({ summary: 'Create department' })
  create(@Body() dto: CreateDepartmentDto) {
    return this.deptService.create(dto);
  }

  @Get()
  @RequirePermissions('personnel:read:profile')
  @ApiOperation({ summary: 'List departments' })
  findAll(@Query() filter: DepartmentFilterDto) {
    return this.deptService.findAll(filter);
  }

  @Get(':id')
  @RequirePermissions('personnel:read:profile')
  @ApiOperation({ summary: 'Get department by ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.deptService.findById(id);
  }

  @Put(':id')
  @RequirePermissions('personnel:write:profile')
  @ApiOperation({ summary: 'Update department' })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateDepartmentDto) {
    return this.deptService.update(id, dto);
  }

  @Delete(':id')
  @RequirePermissions('personnel:write:profile')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete department' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.deptService.delete(id);
  }
}
