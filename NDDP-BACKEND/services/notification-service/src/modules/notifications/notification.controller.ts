import {
  Controller, Get, Post, Put, Delete, Body, Param, Query, ParseUUIDPipe, HttpCode, HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { NotificationService } from './notification.service';
import { NotificationChannel } from '../../common/enums';
import { SendNotificationDto, NotificationFilterDto } from './dto/notification.dto';
import { RequirePermissions } from '@nddtp/platform-core';
import { CurrentUser, CorrelationId } from '../../decorators/current-user.decorator';

@ApiTags('Notifications')
@Controller('notifications')
@ApiBearerAuth()
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post('send')
  @RequirePermissions('notification:send:notifications')
  @ApiOperation({ summary: 'Send notification manually' })
  send(@Body() dto: SendNotificationDto, @CorrelationId() cid: string) {
    return this.notificationService.send(dto, cid);
  }

  @Get('inbox')
  @ApiOperation({ summary: 'Get current user in-app notifications' })
  getInbox(@CurrentUser('sub') userId: string, @Query() filter: NotificationFilterDto) {
    return this.notificationService.getUserNotifications(userId, { ...filter, channel: NotificationChannel.IN_APP });
  }

  @Get('inbox/unread-count')
  @ApiOperation({ summary: 'Get unread in-app notification count' })
  unreadCount(@CurrentUser('sub') userId: string) {
    return this.notificationService.getUnreadCount(userId);
  }

  @Put('inbox/:id/read')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Mark notification as read' })
  markRead(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser('sub') userId: string,
    @CorrelationId() cid: string,
  ) {
    return this.notificationService.markAsRead(id, userId, cid);
  }

  @Put('inbox/read-all')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Mark all notifications as read' })
  markAllRead(@CurrentUser('sub') userId: string) {
    return this.notificationService.markAllAsRead(userId);
  }

  @Get('user/:userId')
  @RequirePermissions('notification:read:notifications')
  @ApiOperation({ summary: 'Get notifications for a user (admin)' })
  getUserNotifications(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Query() filter: NotificationFilterDto,
  ) {
    return this.notificationService.getUserNotifications(userId, filter);
  }

  @Get(':id')
  @RequirePermissions('notification:read:notifications')
  @ApiOperation({ summary: 'Get notification by ID' })
  getById(@Param('id', ParseUUIDPipe) id: string) {
    return this.notificationService.getById(id);
  }
}
