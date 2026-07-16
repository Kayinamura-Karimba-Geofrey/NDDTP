import { Controller, Get, Post, Param, Body, Query, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AnnouncementService } from './announcement.service';
import { CreateAnnouncementDto, AnnouncementFilterDto } from './dto/announcement.dto';
import { RequirePermissions, CurrentUser } from '@nddtp/platform-core';
import { AuthenticatedUser } from '@nddtp/platform-core';
import { PaginationDto } from '@nddtp/platform-core';

@ApiTags('Announcements')
@ApiBearerAuth('access-token')
@Controller('announcements')
export class AnnouncementController {
  constructor(private readonly service: AnnouncementService) {}

  @Post()
  @RequirePermissions('announcement:manage:announcements')
  @ApiOperation({ summary: 'Create announcement draft' })
  create(@CurrentUser() user: AuthenticatedUser, @Body() dto: CreateAnnouncementDto) {
    return this.service.create(user.sub, dto);
  }

  @Get('published')
  @RequirePermissions('announcement:read:announcements')
  @ApiOperation({ summary: 'List published announcements' })
  findPublished() {
    return this.service.findPublished();
  }

  @Get()
  @RequirePermissions('announcement:manage:announcements')
  @ApiOperation({ summary: 'List announcements' })
  findAll(@Query() pagination: PaginationDto, @Query() filter: AnnouncementFilterDto) {
    return this.service.findAll(pagination.page || 1, pagination.limit || 20, filter.status, filter.categoryId);
  }

  @Get(':id')
  @RequirePermissions('announcement:read:announcements')
  @ApiOperation({ summary: 'Get announcement by ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findById(id);
  }

  @Get(':id/audiences')
  @RequirePermissions('announcement:read:announcements')
  @ApiOperation({ summary: 'Get announcement audience targets' })
  findAudiences(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findAudiences(id);
  }

  @Post(':id/publish')
  @RequirePermissions('announcement:manage:announcements')
  @ApiOperation({ summary: 'Publish announcement' })
  publish(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: AuthenticatedUser) {
    return this.service.publish(id, user.sub);
  }

  @Post(':id/withdraw')
  @RequirePermissions('announcement:manage:announcements')
  @ApiOperation({ summary: 'Withdraw announcement' })
  withdraw(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: AuthenticatedUser) {
    return this.service.withdraw(id, user.sub);
  }

  @Post(':id/expire')
  @RequirePermissions('announcement:manage:announcements')
  @ApiOperation({ summary: 'Expire announcement' })
  expire(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.expire(id);
  }
}
