import { Controller, Get, Post, Param, Body, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/product.dto';
import { RequirePermissions } from '@nddtp/platform-core';

@ApiTags('API Products')
@ApiBearerAuth('access-token')
@Controller('products')
export class ProductController {
  constructor(private readonly service: ProductService) {}

  @Post()
  @RequirePermissions('apimanagement:manage:products')
  @ApiOperation({ summary: 'Create API product' })
  create(@Body() dto: CreateProductDto) {
    return this.service.create(dto);
  }

  @Get()
  @RequirePermissions('apimanagement:read:products')
  @ApiOperation({ summary: 'List active API products' })
  findActive() {
    return this.service.findActive();
  }

  @Get(':id')
  @RequirePermissions('apimanagement:read:products')
  @ApiOperation({ summary: 'Get API product by ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findById(id);
  }
}
