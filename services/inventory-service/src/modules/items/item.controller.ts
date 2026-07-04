import { Controller, Get, Post, Param, Query, Body, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ItemService } from './item.service';
import { CreateItemDto, ItemFilterDto } from './dto/item.dto';
import { RequirePermissions } from '../../decorators/auth.decorators';

@ApiTags('Inventory Items')
@ApiBearerAuth('access-token')
@Controller('items')
export class ItemController {
  constructor(private readonly service: ItemService) {}

  @Post()
  @RequirePermissions('inventory:manage:items')
  @ApiOperation({ summary: 'Create inventory item' })
  create(@Body() dto: CreateItemDto) {
    return this.service.create(dto);
  }

  @Get('low-stock')
  @RequirePermissions('inventory:read:stock')
  @ApiOperation({ summary: 'List items at or below reorder level' })
  lowStock() {
    return this.service.findLowStock();
  }

  @Get()
  @RequirePermissions('inventory:read:items')
  @ApiOperation({ summary: 'List inventory items' })
  findAll(@Query() query: ItemFilterDto) {
    return this.service.findAll(query);
  }

  @Get(':id')
  @RequirePermissions('inventory:read:items')
  @ApiOperation({ summary: 'Get item by ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findById(id);
  }
}
