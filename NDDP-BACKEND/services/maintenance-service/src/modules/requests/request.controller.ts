import { Controller, Get, Post, Param, Query, Body, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { RequestService } from './request.service';
import { CreateRequestDto, RejectRequestDto, RequestFilterDto } from './dto/request.dto';
import { RequirePermissions, CurrentUser } from '@nddtp/platform-core';
import { AuthenticatedUser } from '@nddtp/platform-core';
import { PaginationDto } from '@nddtp/platform-core';

@ApiTags('Maintenance Requests')
@ApiBearerAuth('access-token')
@Controller('requests')
export class RequestController {
  constructor(private readonly service: RequestService) {}

  @Post()
  @RequirePermissions('maintenance:read:requests')
  @ApiOperation({ summary: 'Submit maintenance request' })
  submit(@Body() dto: CreateRequestDto, @CurrentUser() user: AuthenticatedUser) {
    return this.service.submit(user.sub, dto);
  }

  @Get('me')
  @RequirePermissions('maintenance:read:requests')
  @ApiOperation({ summary: 'List my requests' })
  mine(@CurrentUser() user: AuthenticatedUser, @Query() query: PaginationDto) {
    return this.service.findMine(user.sub, query.page, query.limit);
  }

  @Get('pending')
  @RequirePermissions('maintenance:manage:requests')
  @ApiOperation({ summary: 'List pending requests' })
  pending(@Query() query: PaginationDto) {
    return this.service.findPending(query.page, query.limit);
  }

  @Get()
  @RequirePermissions('maintenance:manage:requests')
  @ApiOperation({ summary: 'List all requests' })
  findAll(@Query() query: RequestFilterDto) {
    return this.service.findAll(query);
  }

  @Get(':id')
  @RequirePermissions('maintenance:read:requests')
  @ApiOperation({ summary: 'Get request by ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findById(id);
  }

  @Post(':id/approve')
  @RequirePermissions('maintenance:manage:requests')
  @ApiOperation({ summary: 'Approve maintenance request' })
  approve(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: AuthenticatedUser) {
    return this.service.approve(id, user.sub);
  }

  @Post(':id/reject')
  @RequirePermissions('maintenance:manage:requests')
  @ApiOperation({ summary: 'Reject maintenance request' })
  reject(@Param('id', ParseUUIDPipe) id: string, @Body() dto: RejectRequestDto, @CurrentUser() user: AuthenticatedUser) {
    return this.service.reject(id, user.sub, dto);
  }

  @Post(':id/cancel')
  @RequirePermissions('maintenance:read:requests')
  @ApiOperation({ summary: 'Cancel maintenance request' })
  cancel(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.cancel(id);
  }
}
