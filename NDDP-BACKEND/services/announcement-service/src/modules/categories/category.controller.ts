import { Controller, Get, Post, Param, Body, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/category.dto';
import { RequirePermissions } from '@nddtp/platform-core';

@ApiTags('Categories')
@ApiBearerAuth('access-token')
@Controller('categories')
export class CategoryController {
  constructor(private readonly service: CategoryService) {}

  @Post()
  @RequirePermissions('announcement:manage:categories')
  @ApiOperation({ summary: 'Create announcement category' })
  create(@Body() dto: CreateCategoryDto) {
    return this.service.create(dto);
  }

  @Get()
  @RequirePermissions('announcement:read:categories')
  @ApiOperation({ summary: 'List active categories' })
  findActive() {
    return this.service.findActive();
  }

  @Get(':id')
  @RequirePermissions('announcement:read:categories')
  @ApiOperation({ summary: 'Get category by ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findById(id);
  }
}
