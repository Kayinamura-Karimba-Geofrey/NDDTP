import { Controller, Get, Post, Param, Body, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { RouteService } from './route.service';
import { CreateRouteDto } from './dto/route.dto';
import { RequirePermissions } from '@nddtp/platform-core';

@ApiTags('API Routes')
@ApiBearerAuth('access-token')
@Controller('routes')
export class RouteController {
  constructor(private readonly service: RouteService) {}

  @Post()
  @RequirePermissions('apimanagement:manage:routes')
  @ApiOperation({ summary: 'Create API route' })
  create(@Body() dto: CreateRouteDto) {
    return this.service.create(dto);
  }

  @Get('product/:productId')
  @RequirePermissions('apimanagement:read:routes')
  @ApiOperation({ summary: 'List routes for API product' })
  findByProduct(@Param('productId', ParseUUIDPipe) productId: string) {
    return this.service.findByProduct(productId);
  }

  @Get(':id')
  @RequirePermissions('apimanagement:read:routes')
  @ApiOperation({ summary: 'Get API route by ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findById(id);
  }
}
