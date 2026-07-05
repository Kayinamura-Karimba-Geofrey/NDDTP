import { Controller, Get, Post, Param, Query, Body, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { StockService } from './stock.service';
import { StockOperationDto, AdjustStockDto } from './dto/stock.dto';
import { RequirePermissions, CurrentUser } from '@nddtp/platform-core';
import { AuthenticatedUser } from '@nddtp/platform-core';

@ApiTags('Stock Levels')
@ApiBearerAuth('access-token')
@Controller('stock')
export class StockController {
  constructor(private readonly service: StockService) {}

  @Post('receive')
  @RequirePermissions('inventory:manage:stock')
  @ApiOperation({ summary: 'Receive stock into warehouse' })
  receive(@Body() dto: StockOperationDto, @CurrentUser() user: AuthenticatedUser) {
    return this.service.receive(user.sub, dto);
  }

  @Post('issue')
  @RequirePermissions('inventory:manage:stock')
  @ApiOperation({ summary: 'Issue stock from warehouse' })
  issue(@Body() dto: StockOperationDto, @CurrentUser() user: AuthenticatedUser) {
    return this.service.issue(user.sub, dto);
  }

  @Post('adjust')
  @RequirePermissions('inventory:manage:stock')
  @ApiOperation({ summary: 'Adjust stock to absolute quantity' })
  adjust(@Body() dto: AdjustStockDto, @CurrentUser() user: AuthenticatedUser) {
    return this.service.adjust(user.sub, dto);
  }

  @Get('warehouse/:warehouseId')
  @RequirePermissions('inventory:read:stock')
  @ApiOperation({ summary: 'List stock levels for warehouse' })
  byWarehouse(@Param('warehouseId', ParseUUIDPipe) warehouseId: string) {
    return this.service.findByWarehouse(warehouseId);
  }

  @Get('level')
  @RequirePermissions('inventory:read:stock')
  @ApiOperation({ summary: 'Get stock level for warehouse/item' })
  level(@Query('warehouseId', ParseUUIDPipe) warehouseId: string, @Query('itemId', ParseUUIDPipe) itemId: string) {
    return this.service.getLevel(warehouseId, itemId);
  }

  @Get('movements')
  @RequirePermissions('inventory:read:stock')
  @ApiOperation({ summary: 'List stock movements' })
  movements(@Query('warehouseId') warehouseId?: string, @Query('itemId') itemId?: string) {
    return this.service.findMovements(warehouseId, itemId);
  }
}
