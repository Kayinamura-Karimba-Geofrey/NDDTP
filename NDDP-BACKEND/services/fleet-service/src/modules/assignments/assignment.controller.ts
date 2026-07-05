import { Controller, Get, Post, Param, Body, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AssignmentService } from './assignment.service';
import { AssignVehicleDto, ReturnVehicleDto } from './dto/assignment.dto';
import { RequirePermissions, CurrentUser } from '@nddtp/platform-core';
import { AuthenticatedUser } from '@nddtp/platform-core';

@ApiTags('Vehicle Assignments')
@ApiBearerAuth('access-token')
@Controller('assignments')
export class AssignmentController {
  constructor(private readonly service: AssignmentService) {}

  @Post()
  @RequirePermissions('fleet:manage:assignments')
  @ApiOperation({ summary: 'Assign vehicle to driver' })
  assign(@Body() dto: AssignVehicleDto, @CurrentUser() user: AuthenticatedUser) {
    return this.service.assign(user.sub, dto);
  }

  @Post('vehicle/:vehicleId/return')
  @RequirePermissions('fleet:manage:assignments')
  @ApiOperation({ summary: 'Return assigned vehicle' })
  returnVehicle(
    @Param('vehicleId', ParseUUIDPipe) vehicleId: string,
    @Body() dto: ReturnVehicleDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.service.return(vehicleId, user.sub, dto);
  }

  @Get('vehicle/:vehicleId')
  @RequirePermissions('fleet:read:assignments')
  @ApiOperation({ summary: 'List assignments for vehicle' })
  byVehicle(@Param('vehicleId', ParseUUIDPipe) vehicleId: string) {
    return this.service.findByVehicle(vehicleId);
  }

  @Get('driver/:driverId')
  @RequirePermissions('fleet:read:assignments')
  @ApiOperation({ summary: 'List assignments for driver' })
  byDriver(@Param('driverId', ParseUUIDPipe) driverId: string) {
    return this.service.findByDriver(driverId);
  }
}
