import { Controller, Get, Post, Param, Body, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/category.dto';
import { RequirePermissions } from '../../decorators/auth.decorators';

@ApiTags('Asset Categories')
@ApiBearerAuth('access-token')
@Controller('categories')
export class CategoryController {
  constructor(private readonly service: CategoryService) {}

  @Post()
  @RequirePermissions('asset:manage:categories')
  @ApiOperation({ summary: 'Create asset category' })
  create(@Body() dto: CreateCategoryDto) {
    return this.service.create(dto);
  }

  @Get()
  @RequirePermissions('asset:read:categories')
  @ApiOperation({ summary: 'List active categories' })
  findActive() {
    return this.service.findActive();
  }

  @Get(':id')
  @RequirePermissions('asset:read:categories')
  @ApiOperation({ summary: 'Get category by ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findById(id);
  }
}
