import { Controller, Get, Post, Param, Query, Body, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto, CancelAppointmentDto, AppointmentFilterDto } from './dto/appointment.dto';
import { RequirePermissions, CurrentUser } from '../../decorators/auth.decorators';
import { AuthenticatedUser } from '../../common/interfaces';
import { PaginationDto } from '../../common/dto/pagination.dto';

@ApiTags('Medical Appointments')
@ApiBearerAuth('access-token')
@Controller('appointments')
export class AppointmentController {
  constructor(private readonly service: AppointmentService) {}

  @Post()
  @RequirePermissions('medical:read:appointments')
  @ApiOperation({ summary: 'Schedule medical appointment' })
  create(@Body() dto: CreateAppointmentDto, @CurrentUser() user: AuthenticatedUser) {
    return this.service.create(user.sub, dto);
  }

  @Get('me')
  @RequirePermissions('medical:read:appointments')
  @ApiOperation({ summary: 'List my appointments' })
  mine(@CurrentUser() user: AuthenticatedUser, @Query() query: PaginationDto) {
    return this.service.findMine(user.sub, query.page, query.limit);
  }

  @Get()
  @RequirePermissions('medical:manage:appointments')
  @ApiOperation({ summary: 'List all appointments (filtered)' })
  findAll(@Query() query: AppointmentFilterDto) {
    return this.service.findAll(query);
  }

  @Get(':id')
  @RequirePermissions('medical:read:appointments')
  @ApiOperation({ summary: 'Get appointment by ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findById(id);
  }

  @Post(':id/confirm')
  @RequirePermissions('medical:manage:appointments')
  @ApiOperation({ summary: 'Confirm appointment' })
  confirm(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: AuthenticatedUser) {
    return this.service.confirm(id, user.sub);
  }

  @Post(':id/start')
  @RequirePermissions('medical:manage:appointments')
  @ApiOperation({ summary: 'Start appointment (in progress)' })
  start(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: AuthenticatedUser) {
    return this.service.start(id, user.sub);
  }

  @Post(':id/complete')
  @RequirePermissions('medical:manage:appointments')
  @ApiOperation({ summary: 'Complete appointment' })
  complete(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: AuthenticatedUser) {
    return this.service.complete(id, user.sub);
  }

  @Post(':id/cancel')
  @RequirePermissions('medical:read:appointments')
  @ApiOperation({ summary: 'Cancel appointment' })
  cancel(@Param('id', ParseUUIDPipe) id: string, @Body() dto: CancelAppointmentDto, @CurrentUser() user: AuthenticatedUser) {
    return this.service.cancel(id, user.sub, dto, false);
  }

  @Post(':id/cancel-staff')
  @RequirePermissions('medical:manage:appointments')
  @ApiOperation({ summary: 'Cancel appointment (staff)' })
  cancelStaff(@Param('id', ParseUUIDPipe) id: string, @Body() dto: CancelAppointmentDto, @CurrentUser() user: AuthenticatedUser) {
    return this.service.cancel(id, user.sub, dto, true);
  }

  @Post(':id/no-show')
  @RequirePermissions('medical:manage:appointments')
  @ApiOperation({ summary: 'Mark appointment as no-show' })
  noShow(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.markNoShow(id);
  }
}
