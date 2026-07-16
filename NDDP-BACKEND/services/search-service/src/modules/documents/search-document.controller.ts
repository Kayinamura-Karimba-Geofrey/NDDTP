import { Controller, Get, Post, Patch, Delete, Param, Body, Query, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { SearchDocumentService } from './search-document.service';
import { IndexDocumentDto, UpdateDocumentDto } from './dto/search-document.dto';
import { RequirePermissions } from '@nddtp/platform-core';
import { PaginationDto } from '@nddtp/platform-core';

@ApiTags('Search Documents')
@ApiBearerAuth('access-token')
@Controller('documents')
export class SearchDocumentController {
  constructor(private readonly service: SearchDocumentService) {}

  @Post()
  @RequirePermissions('search:manage:documents')
  @ApiOperation({ summary: 'Index a document' })
  index(@Body() dto: IndexDocumentDto) {
    return this.service.index(dto);
  }

  @Get('index/:indexId')
  @RequirePermissions('search:read:documents')
  @ApiOperation({ summary: 'List documents in index' })
  findByIndex(@Param('indexId', ParseUUIDPipe) indexId: string, @Query() pagination: PaginationDto) {
    return this.service.findByIndex(indexId, pagination.page, pagination.limit);
  }

  @Get(':id')
  @RequirePermissions('search:read:documents')
  @ApiOperation({ summary: 'Get document by ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findById(id);
  }

  @Patch(':id')
  @RequirePermissions('search:manage:documents')
  @ApiOperation({ summary: 'Update indexed document' })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateDocumentDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @RequirePermissions('search:manage:documents')
  @ApiOperation({ summary: 'Remove document from index' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.remove(id);
  }
}
