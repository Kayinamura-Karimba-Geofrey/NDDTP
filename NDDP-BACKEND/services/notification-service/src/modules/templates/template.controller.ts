import {
  Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, ParseUUIDPipe, HttpCode, HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { TemplateService } from './template.service';
import { CreateTemplateDto, UpdateTemplateDto, TemplateFilterDto } from '../notifications/dto/notification.dto';
import { JwtAuthGuard, PermissionsGuard } from '@nddtp/platform-core';
import { RequirePermissions } from '@nddtp/platform-core';

@ApiTags('Templates')
@Controller('templates')
@UseGuards(JwtAuthGuard, PermissionsGuard)
@ApiBearerAuth()
export class TemplateController {
  constructor(private readonly templateService: TemplateService) {}

  @Post()
  @RequirePermissions('notification:manage:templates')
  @ApiOperation({ summary: 'Create notification template' })
  create(@Body() dto: CreateTemplateDto) {
    return this.templateService.create(dto);
  }

  @Get()
  @RequirePermissions('notification:manage:templates')
  @ApiOperation({ summary: 'List templates' })
  findAll(@Query() filter: TemplateFilterDto) {
    return this.templateService.findAll(filter);
  }

  @Get(':code')
  @RequirePermissions('notification:manage:templates')
  @ApiOperation({ summary: 'Get template by code' })
  findByCode(@Param('code') code: string) {
    return this.templateService.findByCode(code);
  }

  @Put(':id')
  @RequirePermissions('notification:manage:templates')
  @ApiOperation({ summary: 'Update template' })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateTemplateDto) {
    return this.templateService.update(id, dto);
  }

  @Delete(':id')
  @RequirePermissions('notification:manage:templates')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete template' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.templateService.delete(id);
  }
}
