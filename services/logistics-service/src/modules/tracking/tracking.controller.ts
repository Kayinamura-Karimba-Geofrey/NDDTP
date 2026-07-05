import { Controller, Get, Post, Param, Body, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { TrackingService } from './tracking.service';
import { RecordTrackingDto, DelayShipmentDto } from './dto/tracking.dto';
import { RequirePermissions, CurrentUser } from '@nddtp/platform-core';
import { AuthenticatedUser } from '@nddtp/platform-core';

@ApiTags('Shipment Tracking')
@ApiBearerAuth('access-token')
@Controller('tracking')
export class TrackingController {
  constructor(private readonly service: TrackingService) {}

  @Get('shipment/:shipmentId')
  @RequirePermissions('logistics:read:tracking')
  @ApiOperation({ summary: 'Get tracking history for shipment' })
  history(@Param('shipmentId', ParseUUIDPipe) shipmentId: string) {
    return this.service.getHistory(shipmentId);
  }

  @Post('shipment/:shipmentId')
  @RequirePermissions('logistics:manage:tracking')
  @ApiOperation({ summary: 'Record tracking event' })
  record(
    @Param('shipmentId', ParseUUIDPipe) shipmentId: string,
    @Body() dto: RecordTrackingDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.service.record(shipmentId, user.sub, dto);
  }

  @Post('shipment/:shipmentId/delay')
  @RequirePermissions('logistics:manage:tracking')
  @ApiOperation({ summary: 'Mark shipment delayed' })
  delay(
    @Param('shipmentId', ParseUUIDPipe) shipmentId: string,
    @Body() dto: DelayShipmentDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.service.markDelayed(shipmentId, user.sub, dto);
  }
}
