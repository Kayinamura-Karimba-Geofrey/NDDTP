import { Controller, Get, Post, Param, Query, Body, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { CreateOrderDto, OrderFilterDto } from './dto/order.dto';
import { RequirePermissions, CurrentUser } from '../../decorators/auth.decorators';
import { AuthenticatedUser } from '../../common/interfaces';

@ApiTags('Purchase Orders')
@ApiBearerAuth('access-token')
@Controller('orders')
export class OrderController {
  constructor(private readonly service: OrderService) {}

  @Post()
  @RequirePermissions('procurement:manage:orders')
  @ApiOperation({ summary: 'Create purchase order' })
  create(@Body() dto: CreateOrderDto, @CurrentUser() user: AuthenticatedUser) {
    return this.service.create(user.sub, dto);
  }

  @Get()
  @RequirePermissions('procurement:read:orders')
  @ApiOperation({ summary: 'List purchase orders' })
  findAll(@Query() query: OrderFilterDto) {
    return this.service.findAll(query);
  }

  @Get(':id')
  @RequirePermissions('procurement:read:orders')
  @ApiOperation({ summary: 'Get order by ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findById(id);
  }

  @Post(':id/issue')
  @RequirePermissions('procurement:manage:orders')
  @ApiOperation({ summary: 'Issue purchase order to vendor' })
  issue(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.issue(id);
  }

  @Post(':id/cancel')
  @RequirePermissions('procurement:manage:orders')
  @ApiOperation({ summary: 'Cancel purchase order' })
  cancel(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.cancel(id);
  }
}
