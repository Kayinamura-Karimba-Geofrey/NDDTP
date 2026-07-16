import { Controller, Get, Post, Param, Body, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { TripService } from './trip.service';
import { LogTripDto } from './dto/trip.dto';
import { RequirePermissions, CurrentUser } from '@nddtp/platform-core';
import { AuthenticatedUser } from '@nddtp/platform-core';

@ApiTags('Trip Logs')
@ApiBearerAuth('access-token')
@Controller('trips')
export class TripController {
  constructor(private readonly service: TripService) {}

  @Post()
  @RequirePermissions('fleet:manage:trips')
  @ApiOperation({ summary: 'Log vehicle trip' })
  log(@Body() dto: LogTripDto, @CurrentUser() user: AuthenticatedUser) {
    return this.service.log(user.sub, dto);
  }

  @Get('vehicle/:vehicleId')
  @RequirePermissions('fleet:read:trips')
  @ApiOperation({ summary: 'List trips for vehicle' })
  byVehicle(@Param('vehicleId', ParseUUIDPipe) vehicleId: string) {
    return this.service.findByVehicle(vehicleId);
  }

  @Get('driver/:driverId')
  @RequirePermissions('fleet:read:trips')
  @ApiOperation({ summary: 'List trips for driver' })
  byDriver(@Param('driverId', ParseUUIDPipe) driverId: string) {
    return this.service.findByDriver(driverId);
  }
}
