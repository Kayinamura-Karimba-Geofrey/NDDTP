import { Controller, Get, Post, Param, Query, Body, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { RequisitionService } from './requisition.service';
import { CreateRequisitionDto, RejectRequisitionDto, RequisitionFilterDto } from './dto/requisition.dto';
import { RequirePermissions, CurrentUser } from '@nddtp/platform-core';
import { AuthenticatedUser } from '@nddtp/platform-core';
import { PaginationDto } from '@nddtp/platform-core';

@ApiTags('Purchase Requisitions')
@ApiBearerAuth('access-token')
@Controller('requisitions')
export class RequisitionController {
  constructor(private readonly service: RequisitionService) {}

  @Post()
  @RequirePermissions('procurement:read:requisitions')
  @ApiOperation({ summary: 'Create purchase requisition' })
  create(@Body() dto: CreateRequisitionDto, @CurrentUser() user: AuthenticatedUser) {
    return this.service.create(user.sub, dto);
  }

  @Get('me')
  @RequirePermissions('procurement:read:requisitions')
  @ApiOperation({ summary: 'List my requisitions' })
  mine(@CurrentUser() user: AuthenticatedUser, @Query() query: PaginationDto) {
    return this.service.findMine(user.sub, query.page, query.limit);
  }

  @Get('pending')
  @RequirePermissions('procurement:manage:requisitions')
  @ApiOperation({ summary: 'List pending requisitions' })
  pending(@Query() query: PaginationDto) {
    return this.service.findPending(query.page, query.limit);
  }

  @Get()
  @RequirePermissions('procurement:manage:requisitions')
  @ApiOperation({ summary: 'List all requisitions' })
  findAll(@Query() query: RequisitionFilterDto) {
    return this.service.findAll(query);
  }

  @Get(':id')
  @RequirePermissions('procurement:read:requisitions')
  @ApiOperation({ summary: 'Get requisition by ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findById(id);
  }

  @Post(':id/submit')
  @RequirePermissions('procurement:read:requisitions')
  @ApiOperation({ summary: 'Submit requisition for approval' })
  submit(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: AuthenticatedUser) {
    return this.service.submit(id, user.sub);
  }

  @Post(':id/approve')
  @RequirePermissions('procurement:manage:requisitions')
  @ApiOperation({ summary: 'Approve requisition' })
  approve(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: AuthenticatedUser) {
    return this.service.approve(id, user.sub);
  }

  @Post(':id/reject')
  @RequirePermissions('procurement:manage:requisitions')
  @ApiOperation({ summary: 'Reject requisition' })
  reject(@Param('id', ParseUUIDPipe) id: string, @Body() dto: RejectRequisitionDto, @CurrentUser() user: AuthenticatedUser) {
    return this.service.reject(id, user.sub, dto);
  }

  @Post(':id/cancel')
  @RequirePermissions('procurement:read:requisitions')
  @ApiOperation({ summary: 'Cancel requisition' })
  cancel(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: AuthenticatedUser) {
    return this.service.cancel(id, user.sub);
  }
}
