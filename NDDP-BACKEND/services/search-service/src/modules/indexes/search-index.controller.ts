import { Controller, Get, Post, Param, Body, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { SearchIndexService } from './search-index.service';
import { CreateSearchIndexDto } from './dto/search-index.dto';
import { RequirePermissions } from '@nddtp/platform-core';

@ApiTags('Search Indexes')
@ApiBearerAuth('access-token')
@Controller('indexes')
export class SearchIndexController {
  constructor(private readonly service: SearchIndexService) {}

  @Post()
  @RequirePermissions('search:manage:indexes')
  @ApiOperation({ summary: 'Create search index' })
  create(@Body() dto: CreateSearchIndexDto) {
    return this.service.create(dto);
  }

  @Get()
  @RequirePermissions('search:read:indexes')
  @ApiOperation({ summary: 'List active search indexes' })
  findActive() {
    return this.service.findActive();
  }

  @Get(':id')
  @RequirePermissions('search:read:indexes')
  @ApiOperation({ summary: 'Get search index by ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findById(id);
  }
}
