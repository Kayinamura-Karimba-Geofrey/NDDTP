import { Controller, Get, Post, Param, Query, Body, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ShipmentService } from './shipment.service';
import { CreateShipmentDto, ScheduleShipmentDto, ShipmentFilterDto } from './dto/shipment.dto';
import { RequirePermissions, CurrentUser } from '../../decorators/auth.decorators';
import { AuthenticatedUser } from '../../common/interfaces';

@ApiTags('Shipments')
@ApiBearerAuth('access-token')
@Controller('shipments')
export class ShipmentController {
  constructor(private readonly service: ShipmentService) {}

  @Post()
  @RequirePermissions('logistics:manage:shipments')
  @ApiOperation({ summary: 'Create shipment with cargo items' })
  create(@Body() dto: CreateShipmentDto, @CurrentUser() user: AuthenticatedUser) {
    return this.service.create(user.sub, dto);
  }

  @Get()
  @RequirePermissions('logistics:read:shipments')
  @ApiOperation({ summary: 'List shipments' })
  findAll(@Query() query: ShipmentFilterDto) {
    return this.service.findAll(query);
  }

  @Get(':id')
  @RequirePermissions('logistics:read:shipments')
  @ApiOperation({ summary: 'Get shipment by ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findById(id);
  }

  @Post(':id/schedule')
  @RequirePermissions('logistics:manage:shipments')
  @ApiOperation({ summary: 'Schedule shipment' })
  schedule(@Param('id', ParseUUIDPipe) id: string, @Body() dto: ScheduleShipmentDto, @CurrentUser() user: AuthenticatedUser) {
    return this.service.schedule(id, user.sub, dto);
  }

  @Post(':id/dispatch')
  @RequirePermissions('logistics:manage:shipments')
  @ApiOperation({ summary: 'Dispatch shipment' })
  dispatch(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: AuthenticatedUser) {
    return this.service.dispatch(id, user.sub);
  }

  @Post(':id/in-transit')
  @RequirePermissions('logistics:manage:shipments')
  @ApiOperation({ summary: 'Mark shipment in transit' })
  inTransit(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: AuthenticatedUser) {
    return this.service.markInTransit(id, user.sub);
  }

  @Post(':id/deliver')
  @RequirePermissions('logistics:manage:shipments')
  @ApiOperation({ summary: 'Mark shipment delivered' })
  deliver(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: AuthenticatedUser) {
    return this.service.deliver(id, user.sub);
  }

  @Post(':id/cancel')
  @RequirePermissions('logistics:manage:shipments')
  @ApiOperation({ summary: 'Cancel shipment' })
  cancel(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: AuthenticatedUser) {
    return this.service.cancel(id, user.sub);
  }
}
