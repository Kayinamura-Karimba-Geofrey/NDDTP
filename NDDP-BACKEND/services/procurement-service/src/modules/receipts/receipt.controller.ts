import { Controller, Get, Post, Param, Body, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ReceiptService } from './receipt.service';
import { RecordReceiptDto } from './dto/receipt.dto';
import { RequirePermissions, CurrentUser } from '@nddtp/platform-core';
import { AuthenticatedUser } from '@nddtp/platform-core';

@ApiTags('Goods Receipts')
@ApiBearerAuth('access-token')
@Controller('receipts')
export class ReceiptController {
  constructor(private readonly service: ReceiptService) {}

  @Post()
  @RequirePermissions('procurement:manage:receipts')
  @ApiOperation({ summary: 'Record goods receipt against order' })
  record(@Body() dto: RecordReceiptDto, @CurrentUser() user: AuthenticatedUser) {
    return this.service.record(user.sub, dto);
  }

  @Get('order/:orderId')
  @RequirePermissions('procurement:read:receipts')
  @ApiOperation({ summary: 'List receipts for order' })
  byOrder(@Param('orderId', ParseUUIDPipe) orderId: string) {
    return this.service.findByOrder(orderId);
  }

  @Get(':id')
  @RequirePermissions('procurement:read:receipts')
  @ApiOperation({ summary: 'Get receipt by ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findById(id);
  }
}
