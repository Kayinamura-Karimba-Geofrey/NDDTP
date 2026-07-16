import { Controller, Get, Post, Param, Body, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ConversationService } from './conversation.service';
import { CreateConversationDto } from './dto/conversation.dto';
import { RequirePermissions, CurrentUser } from '@nddtp/platform-core';
import { AuthenticatedUser } from '@nddtp/platform-core';

@ApiTags('AI Conversations')
@ApiBearerAuth('access-token')
@Controller('conversations')
export class ConversationController {
  constructor(private readonly service: ConversationService) {}

  @Post()
  @RequirePermissions('aiassistant:read:conversations')
  @ApiOperation({ summary: 'Start new conversation' })
  create(@Body() dto: CreateConversationDto, @CurrentUser() user: AuthenticatedUser) {
    return this.service.create(user.sub, dto);
  }

  @Get('me')
  @RequirePermissions('aiassistant:read:conversations')
  @ApiOperation({ summary: 'List my active conversations' })
  mine(@CurrentUser() user: AuthenticatedUser) {
    return this.service.findMine(user.sub);
  }

  @Get(':id')
  @RequirePermissions('aiassistant:read:conversations')
  @ApiOperation({ summary: 'Get conversation by ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: AuthenticatedUser) {
    return this.service.findById(id, user.sub);
  }

  @Post(':id/close')
  @RequirePermissions('aiassistant:read:conversations')
  @ApiOperation({ summary: 'Close conversation' })
  close(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: AuthenticatedUser) {
    return this.service.close(id, user.sub);
  }

  @Post(':id/archive')
  @RequirePermissions('aiassistant:read:conversations')
  @ApiOperation({ summary: 'Archive conversation' })
  archive(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: AuthenticatedUser) {
    return this.service.archive(id, user.sub);
  }
}
