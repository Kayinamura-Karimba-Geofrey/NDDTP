import { Controller, Get, Post, Param, Query, Body, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { RequestService } from './request.service';
import { CreateRequestDto, ApproveRequestDto, RejectRequestDto, RequestFilterDto } from './dto/request.dto';
import { RequirePermissions, CurrentUser } from '@nddtp/platform-core';
import { AuthenticatedUser } from '@nddtp/platform-core';
import { PaginationDto } from '@nddtp/platform-core';

@ApiTags('Stock Requests')
@ApiBearerAuth('access-token')
@Controller('requests')
export class RequestController {
  constructor(private readonly service: RequestService) {}

  @Post()
  @RequirePermissions('inventory:read:requests')
  @ApiOperation({ summary: 'Submit stock request' })
  submit(@Body() dto: CreateRequestDto, @CurrentUser() user: AuthenticatedUser) {
    return this.service.submit(user.sub, dto);
  }

  @Get('me')
  @RequirePermissions('inventory:read:requests')
  @ApiOperation({ summary: 'List my stock requests' })
  mine(@CurrentUser() user: AuthenticatedUser, @Query() query: PaginationDto) {
    return this.service.findMine(user.sub, query.page, query.limit);
  }

  @Get('pending')
  @RequirePermissions('inventory:manage:requests')
  @ApiOperation({ summary: 'List pending stock requests' })
  pending(@Query() query: PaginationDto) {
    return this.service.findPending(query.page, query.limit);
  }

  @Get()
  @RequirePermissions('inventory:manage:requests')
  @ApiOperation({ summary: 'List all stock requests' })
  findAll(@Query() query: RequestFilterDto) {
    return this.service.findAll(query);
  }

  @Get(':id')
  @RequirePermissions('inventory:read:requests')
  @ApiOperation({ summary: 'Get request by ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findById(id);
  }

  @Post(':id/approve')
  @RequirePermissions('inventory:manage:requests')
  @ApiOperation({ summary: 'Approve stock request' })
  approve(@Param('id', ParseUUIDPipe) id: string, @Body() dto: ApproveRequestDto, @CurrentUser() user: AuthenticatedUser) {
    return this.service.approve(id, user.sub, dto);
  }

  @Post(':id/reject')
  @RequirePermissions('inventory:manage:requests')
  @ApiOperation({ summary: 'Reject stock request' })
  reject(@Param('id', ParseUUIDPipe) id: string, @Body() dto: RejectRequestDto, @CurrentUser() user: AuthenticatedUser) {
    return this.service.reject(id, user.sub, dto);
  }

  @Post(':id/fulfill')
  @RequirePermissions('inventory:manage:requests')
  @ApiOperation({ summary: 'Fulfill approved stock request' })
  fulfill(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: AuthenticatedUser) {
    return this.service.fulfill(id, user.sub);
  }

  @Post(':id/cancel')
  @RequirePermissions('inventory:read:requests')
  @ApiOperation({ summary: 'Cancel stock request' })
  cancel(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: AuthenticatedUser) {
    return this.service.cancel(id, user.sub);
  }
}
