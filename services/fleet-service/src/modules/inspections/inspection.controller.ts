import { Controller, Get, Post, Param, Query, Body, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { InspectionService } from './inspection.service';
import { ScheduleInspectionDto, CompleteInspectionDto } from './dto/inspection.dto';
import { RequirePermissions, CurrentUser } from '../../decorators/auth.decorators';
import { AuthenticatedUser } from '../../common/interfaces';
import { PaginationDto } from '../../common/dto/pagination.dto';

@ApiTags('Vehicle Inspections')
@ApiBearerAuth('access-token')
@Controller('inspections')
export class InspectionController {
  constructor(private readonly service: InspectionService) {}

  @Post()
  @RequirePermissions('fleet:manage:inspections')
  @ApiOperation({ summary: 'Schedule vehicle inspection' })
  schedule(@Body() dto: ScheduleInspectionDto, @CurrentUser() user: AuthenticatedUser) {
    return this.service.schedule(user.sub, dto);
  }

  @Get('scheduled')
  @RequirePermissions('fleet:read:inspections')
  @ApiOperation({ summary: 'List scheduled inspections' })
  scheduled(@Query() query: PaginationDto) {
    return this.service.findScheduled(query.page, query.limit);
  }

  @Get('vehicle/:vehicleId')
  @RequirePermissions('fleet:read:inspections')
  @ApiOperation({ summary: 'List inspections for vehicle' })
  byVehicle(@Param('vehicleId', ParseUUIDPipe) vehicleId: string) {
    return this.service.findByVehicle(vehicleId);
  }

  @Get(':id')
  @RequirePermissions('fleet:read:inspections')
  @ApiOperation({ summary: 'Get inspection by ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findById(id);
  }

  @Post(':id/complete')
  @RequirePermissions('fleet:manage:inspections')
  @ApiOperation({ summary: 'Complete inspection with result' })
  complete(@Param('id', ParseUUIDPipe) id: string, @Body() dto: CompleteInspectionDto, @CurrentUser() user: AuthenticatedUser) {
    return this.service.complete(id, user.sub, dto);
  }

  @Post(':id/cancel')
  @RequirePermissions('fleet:manage:inspections')
  @ApiOperation({ summary: 'Cancel scheduled inspection' })
  cancel(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.cancel(id);
  }
}
