import { Controller, Get, Post, Param, Query, Body, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { RecordService } from './record.service';
import { CreateRecordDto, RecordFilterDto } from './dto/record.dto';
import { RequirePermissions, CurrentUser } from '@nddtp/platform-core';
import { AuthenticatedUser } from '@nddtp/platform-core';
import { PaginationDto } from '@nddtp/platform-core';

@ApiTags('Medical Records')
@ApiBearerAuth('access-token')
@Controller('records')
export class RecordController {
  constructor(private readonly service: RecordService) {}

  @Post()
  @RequirePermissions('medical:manage:records')
  @ApiOperation({ summary: 'Create medical record' })
  create(@Body() dto: CreateRecordDto, @CurrentUser() user: AuthenticatedUser) {
    return this.service.create(user.sub, dto);
  }

  @Get('me')
  @RequirePermissions('medical:read:records')
  @ApiOperation({ summary: 'List my medical records' })
  mine(@CurrentUser() user: AuthenticatedUser, @Query() query: PaginationDto) {
    return this.service.findMine(user.sub, query.page, query.limit);
  }

  @Get()
  @RequirePermissions('medical:manage:records')
  @ApiOperation({ summary: 'List all medical records (filtered)' })
  findAll(@Query() query: RecordFilterDto) {
    return this.service.findAll(query);
  }

  @Get(':id')
  @RequirePermissions('medical:read:records')
  @ApiOperation({ summary: 'Get medical record by ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findById(id);
  }
}
