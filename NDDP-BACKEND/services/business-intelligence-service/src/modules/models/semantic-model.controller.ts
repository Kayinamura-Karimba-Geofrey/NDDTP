import { Controller, Get, Post, Patch, Param, Body, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { SemanticModelService } from './semantic-model.service';
import { CreateSemanticModelDto, UpdateModelStatusDto } from './dto/semantic-model.dto';
import { RequirePermissions } from '@nddtp/platform-core';

@ApiTags('Semantic Models')
@ApiBearerAuth('access-token')
@Controller('models')
export class SemanticModelController {
  constructor(private readonly service: SemanticModelService) {}

  @Post()
  @RequirePermissions('bi:manage:models')
  @ApiOperation({ summary: 'Create semantic model' })
  create(@Body() dto: CreateSemanticModelDto) {
    return this.service.create(dto);
  }

  @Get()
  @RequirePermissions('bi:read:models')
  @ApiOperation({ summary: 'List active semantic models' })
  findActive() {
    return this.service.findActive();
  }

  @Get('dataset/:datasetId')
  @RequirePermissions('bi:read:models')
  @ApiOperation({ summary: 'List models for dataset' })
  findByDataset(@Param('datasetId', ParseUUIDPipe) datasetId: string) {
    return this.service.findByDataset(datasetId);
  }

  @Get(':id')
  @RequirePermissions('bi:read:models')
  @ApiOperation({ summary: 'Get semantic model by ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findById(id);
  }

  @Post(':id/activate')
  @RequirePermissions('bi:manage:models')
  @ApiOperation({ summary: 'Activate semantic model' })
  activate(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.activate(id);
  }

  @Patch(':id/status')
  @RequirePermissions('bi:manage:models')
  @ApiOperation({ summary: 'Update model status' })
  updateStatus(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateModelStatusDto) {
    return this.service.updateStatus(id, dto);
  }
}
