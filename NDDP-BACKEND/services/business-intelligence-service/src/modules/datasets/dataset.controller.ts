import { Controller, Get, Post, Param, Body, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { BiDatasetService } from './dataset.service';
import { CreateBiDatasetDto } from './dto/dataset.dto';
import { RequirePermissions } from '@nddtp/platform-core';

@ApiTags('Datasets')
@ApiBearerAuth('access-token')
@Controller('datasets')
export class BiDatasetController {
  constructor(private readonly service: BiDatasetService) {}

  @Post()
  @RequirePermissions('bi:manage:datasets')
  @ApiOperation({ summary: 'Create BI dataset' })
  create(@Body() dto: CreateBiDatasetDto) {
    return this.service.create(dto);
  }

  @Get()
  @RequirePermissions('bi:read:datasets')
  @ApiOperation({ summary: 'List active datasets' })
  findActive() {
    return this.service.findActive();
  }

  @Get(':id')
  @RequirePermissions('bi:read:datasets')
  @ApiOperation({ summary: 'Get dataset by ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findById(id);
  }
}
