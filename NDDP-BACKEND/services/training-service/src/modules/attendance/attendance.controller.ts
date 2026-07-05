import { Controller, Get, Post, Param, Body, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AttendanceService } from './attendance.service';
import { RecordAttendanceDto } from './dto/attendance.dto';
import { RequirePermissions, CurrentUser } from '@nddtp/platform-core';
import { AuthenticatedUser } from '@nddtp/platform-core';

@ApiTags('Session Attendance')
@ApiBearerAuth('access-token')
@Controller('attendance')
export class AttendanceController {
  constructor(private readonly service: AttendanceService) {}

  @Post()
  @RequirePermissions('training:manage:enrollments')
  @ApiOperation({ summary: 'Record session attendance' })
  record(@Body() dto: RecordAttendanceDto, @CurrentUser() user: AuthenticatedUser) {
    return this.service.record(user.sub, dto);
  }

  @Get('enrollment/:enrollmentId')
  @RequirePermissions('training:read:enrollments')
  @ApiOperation({ summary: 'Get attendance for enrollment' })
  findByEnrollment(@Param('enrollmentId', ParseUUIDPipe) enrollmentId: string) {
    return this.service.findByEnrollment(enrollmentId);
  }
}
