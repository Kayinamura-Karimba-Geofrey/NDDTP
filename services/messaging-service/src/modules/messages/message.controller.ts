import { Controller, Get, Post, Delete, Param, Body, Query, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { MessageService } from './message.service';
import { SendMessageDto, MarkDeliveredDto, MarkReadDto } from './dto/message.dto';
import { RequirePermissions, CurrentUser } from '../../decorators/auth.decorators';
import { AuthenticatedUser } from '../../common/interfaces';
import { PaginationDto } from '../../common/dto/pagination.dto';

@ApiTags('Messages')
@ApiBearerAuth('access-token')
@Controller('messages')
export class MessageController {
  constructor(private readonly service: MessageService) {}

  @Post()
  @RequirePermissions('messaging:manage:messages')
  @ApiOperation({ summary: 'Send message' })
  send(@CurrentUser() user: AuthenticatedUser, @Body() dto: SendMessageDto) {
    return this.service.send(user.sub, dto);
  }

  @Get('channel/:channelId')
  @RequirePermissions('messaging:read:messages')
  @ApiOperation({ summary: 'List channel messages' })
  findByChannel(
    @Param('channelId', ParseUUIDPipe) channelId: string,
    @CurrentUser() user: AuthenticatedUser,
    @Query() pagination: PaginationDto,
  ) {
    return this.service.findByChannel(channelId, user.sub, pagination.page, pagination.limit);
  }

  @Get(':id')
  @RequirePermissions('messaging:read:messages')
  @ApiOperation({ summary: 'Get message by ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: AuthenticatedUser) {
    return this.service.findById(id, user.sub);
  }

  @Post(':id/delivered')
  @RequirePermissions('messaging:read:messages')
  @ApiOperation({ summary: 'Mark message as delivered' })
  markDelivered(@Param('id', ParseUUIDPipe) id: string, @Body() dto: MarkDeliveredDto) {
    return this.service.markDelivered(id, dto);
  }

  @Post(':id/read')
  @RequirePermissions('messaging:read:messages')
  @ApiOperation({ summary: 'Mark message as read' })
  markRead(@Param('id', ParseUUIDPipe) id: string, @Body() dto: MarkReadDto) {
    return this.service.markRead(id, dto);
  }

  @Delete(':id')
  @RequirePermissions('messaging:manage:messages')
  @ApiOperation({ summary: 'Delete own message' })
  deleteMessage(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: AuthenticatedUser) {
    return this.service.deleteMessage(id, user.sub);
  }
}
