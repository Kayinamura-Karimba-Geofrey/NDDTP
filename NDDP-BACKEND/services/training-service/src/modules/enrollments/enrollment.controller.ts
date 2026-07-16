import { Controller, Get, Post, Param, Query, Body, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { EnrollmentService } from './enrollment.service';
import { CreateEnrollmentDto, RejectEnrollmentDto, CompleteEnrollmentDto, EnrollmentFilterDto } from './dto/enrollment.dto';
import { RequirePermissions, CurrentUser } from '@nddtp/platform-core';
import { AuthenticatedUser } from '@nddtp/platform-core';
import { PaginationDto } from '@nddtp/platform-core';

@ApiTags('Training Enrollments')
@ApiBearerAuth('access-token')
@Controller('enrollments')
export class EnrollmentController {
  constructor(private readonly service: EnrollmentService) {}

  @Post()
  @RequirePermissions('training:read:enrollments')
  @ApiOperation({ summary: 'Submit enrollment request' })
  submit(@Body() dto: CreateEnrollmentDto, @CurrentUser() user: AuthenticatedUser) {
    return this.service.submit(user.sub, dto);
  }

  @Get('me')
  @RequirePermissions('training:read:enrollments')
  @ApiOperation({ summary: 'List my enrollments' })
  mine(@CurrentUser() user: AuthenticatedUser, @Query() query: PaginationDto) {
    return this.service.findMine(user.sub, query.page, query.limit);
  }

  @Get('pending-review')
  @RequirePermissions('training:manage:enrollments')
  @ApiOperation({ summary: 'List enrollments pending review' })
  pending(@Query() query: PaginationDto) {
    return this.service.findPendingReview(query.page, query.limit);
  }

  @Get()
  @RequirePermissions('training:manage:enrollments')
  @ApiOperation({ summary: 'List all enrollments (filtered)' })
  findAll(@Query() query: EnrollmentFilterDto) {
    return this.service.findAll(query);
  }

  @Get(':id')
  @RequirePermissions('training:read:enrollments')
  @ApiOperation({ summary: 'Get enrollment by ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findById(id);
  }

  @Post(':id/approve')
  @RequirePermissions('training:manage:enrollments')
  @ApiOperation({ summary: 'Approve enrollment' })
  approve(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: AuthenticatedUser) {
    return this.service.approve(id, user.sub);
  }

  @Post(':id/reject')
  @RequirePermissions('training:manage:enrollments')
  @ApiOperation({ summary: 'Reject enrollment' })
  reject(@Param('id', ParseUUIDPipe) id: string, @Body() dto: RejectEnrollmentDto, @CurrentUser() user: AuthenticatedUser) {
    return this.service.reject(id, user.sub, dto);
  }

  @Post(':id/confirm')
  @RequirePermissions('training:manage:enrollments')
  @ApiOperation({ summary: 'Confirm enrollment (seat assigned)' })
  confirm(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.confirmEnrollment(id);
  }

  @Post(':id/start')
  @RequirePermissions('training:manage:enrollments')
  @ApiOperation({ summary: 'Start training for enrollment' })
  start(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.startTraining(id);
  }

  @Post(':id/complete')
  @RequirePermissions('training:manage:enrollments')
  @ApiOperation({ summary: 'Complete enrollment with score' })
  complete(@Param('id', ParseUUIDPipe) id: string, @Body() dto: CompleteEnrollmentDto) {
    return this.service.complete(id, dto);
  }

  @Post(':id/withdraw')
  @RequirePermissions('training:read:enrollments')
  @ApiOperation({ summary: 'Withdraw enrollment' })
  withdraw(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: AuthenticatedUser) {
    return this.service.withdraw(id, user.sub);
  }
}
