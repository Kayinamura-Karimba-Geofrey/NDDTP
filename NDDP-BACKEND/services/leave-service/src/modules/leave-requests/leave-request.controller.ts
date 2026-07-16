import { Controller, Get, Post, Patch, Param, Query, Body, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { LeaveRequestService } from './leave-request.service';
import { CreateLeaveRequestDto, ApproveLeaveDto, RejectLeaveDto, LeaveRequestFilterDto } from './dto/leave-request.dto';
import { RequirePermissions, CurrentUser } from '@nddtp/platform-core';
import { AuthenticatedUser } from '@nddtp/platform-core';
import { PaginationDto } from '@nddtp/platform-core';

@ApiTags('Leave Requests')
@ApiBearerAuth('access-token')
@Controller('leave-requests')
export class LeaveRequestController {
  constructor(private readonly service: LeaveRequestService) {}

  @Post()
  @RequirePermissions('leave:read:requests')
  @ApiOperation({ summary: 'Create leave request (draft)' })
  create(@Body() dto: CreateLeaveRequestDto, @CurrentUser() user: AuthenticatedUser) {
    return this.service.create(user.sub, dto);
  }

  @Get('me')
  @RequirePermissions('leave:read:requests')
  @ApiOperation({ summary: 'List my leave requests' })
  myRequests(@CurrentUser() user: AuthenticatedUser, @Query() query: PaginationDto) {
    return this.service.findMyRequests(user.sub, query.page, query.limit);
  }

  @Get('pending-approvals')
  @RequirePermissions('leave:approve:requests')
  @ApiOperation({ summary: 'List pending approvals for current approver' })
  pending(@CurrentUser() user: AuthenticatedUser, @Query() query: PaginationDto) {
    return this.service.findPendingApprovals(user.sub, query.page, query.limit);
  }

  @Get()
  @RequirePermissions('leave:read:requests')
  @ApiOperation({ summary: 'List all leave requests (filtered)' })
  findAll(@Query() query: LeaveRequestFilterDto) {
    return this.service.findAll(query);
  }

  @Get(':id')
  @RequirePermissions('leave:read:requests')
  @ApiOperation({ summary: 'Get leave request by ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findById(id);
  }

  @Post(':id/submit')
  @RequirePermissions('leave:read:requests')
  @ApiOperation({ summary: 'Submit leave request for approval' })
  submit(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: AuthenticatedUser) {
    return this.service.submit(id, user.sub);
  }

  @Post(':id/approve')
  @RequirePermissions('leave:approve:requests')
  @ApiOperation({ summary: 'Approve leave request' })
  approve(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: ApproveLeaveDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.service.approve(id, user.sub, dto.comments);
  }

  @Post(':id/reject')
  @RequirePermissions('leave:approve:requests')
  @ApiOperation({ summary: 'Reject leave request' })
  reject(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: RejectLeaveDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.service.reject(id, user.sub, dto);
  }

  @Patch(':id/cancel')
  @RequirePermissions('leave:read:requests')
  @ApiOperation({ summary: 'Cancel leave request' })
  cancel(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: AuthenticatedUser) {
    return this.service.cancel(id, user.sub);
  }
}
