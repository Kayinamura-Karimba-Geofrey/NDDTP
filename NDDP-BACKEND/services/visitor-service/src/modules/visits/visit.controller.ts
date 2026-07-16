import { Controller, Get, Post, Param, Query, Body, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { VisitService } from './visit.service';
import { CreateVisitDto, RejectVisitDto, VisitFilterDto } from './dto/visit.dto';
import { RequirePermissions, CurrentUser } from '@nddtp/platform-core';
import { AuthenticatedUser } from '@nddtp/platform-core';
import { PaginationDto } from '@nddtp/platform-core';

@ApiTags('Visit Requests')
@ApiBearerAuth('access-token')
@Controller('visits')
export class VisitController {
  constructor(private readonly service: VisitService) {}

  @Post()
  @RequirePermissions('visitor:read:visits')
  @ApiOperation({ summary: 'Submit visit request' })
  create(@Body() dto: CreateVisitDto, @CurrentUser() user: AuthenticatedUser) {
    return this.service.create(user.sub, dto);
  }

  @Get('me')
  @RequirePermissions('visitor:read:visits')
  @ApiOperation({ summary: 'List my hosted visits' })
  mine(@CurrentUser() user: AuthenticatedUser, @Query() query: PaginationDto) {
    return this.service.findMine(user.sub, query.page, query.limit);
  }

  @Get('pending')
  @RequirePermissions('visitor:manage:visits')
  @ApiOperation({ summary: 'List pending visit requests' })
  pending(@Query() query: PaginationDto) {
    return this.service.findPending(query.page, query.limit);
  }

  @Get()
  @RequirePermissions('visitor:manage:visits')
  @ApiOperation({ summary: 'List visit requests' })
  findAll(@Query() query: VisitFilterDto) {
    return this.service.findAll(query);
  }

  @Get(':id')
  @RequirePermissions('visitor:read:visits')
  @ApiOperation({ summary: 'Get visit by ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findById(id);
  }

  @Post(':id/approve')
  @RequirePermissions('visitor:manage:visits')
  @ApiOperation({ summary: 'Approve visit request' })
  approve(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: AuthenticatedUser) {
    return this.service.approve(id, user.sub);
  }

  @Post(':id/reject')
  @RequirePermissions('visitor:manage:visits')
  @ApiOperation({ summary: 'Reject visit request' })
  reject(@Param('id', ParseUUIDPipe) id: string, @Body() dto: RejectVisitDto, @CurrentUser() user: AuthenticatedUser) {
    return this.service.reject(id, user.sub, dto);
  }

  @Post(':id/cancel')
  @RequirePermissions('visitor:read:visits')
  @ApiOperation({ summary: 'Cancel own visit request' })
  cancel(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: AuthenticatedUser) {
    return this.service.cancel(id, user.sub, false);
  }

  @Post(':id/cancel-staff')
  @RequirePermissions('visitor:manage:visits')
  @ApiOperation({ summary: 'Cancel visit request (staff)' })
  cancelStaff(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: AuthenticatedUser) {
    return this.service.cancel(id, user.sub, true);
  }
}
