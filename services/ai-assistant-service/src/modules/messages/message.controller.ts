import { Controller, Get, Post, Param, Body, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { MessageService } from './message.service';
import { SendMessageDto, CompleteMessageDto, FailMessageDto, CreateAssistantMessageDto } from './dto/message.dto';
import { RequirePermissions, CurrentUser } from '../../decorators/auth.decorators';
import { AuthenticatedUser } from '../../common/interfaces';

@ApiTags('AI Messages')
@ApiBearerAuth('access-token')
@Controller('messages')
export class MessageController {
  constructor(private readonly service: MessageService) {}

  @Post()
  @RequirePermissions('aiassistant:read:messages')
  @ApiOperation({ summary: 'Send user message' })
  send(@Body() dto: SendMessageDto, @CurrentUser() user: AuthenticatedUser) {
    return this.service.sendUserMessage(user.sub, dto);
  }

  @Get('conversation/:conversationId')
  @RequirePermissions('aiassistant:read:messages')
  @ApiOperation({ summary: 'List messages in conversation' })
  findByConversation(
    @Param('conversationId', ParseUUIDPipe) conversationId: string,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.service.findByConversation(conversationId, user.sub);
  }

  @Post('assistant')
  @RequirePermissions('aiassistant:manage:messages')
  @ApiOperation({ summary: 'Create pending assistant message placeholder' })
  createAssistant(@Body() dto: CreateAssistantMessageDto) {
    return this.service.createAssistantPlaceholder(dto);
  }

  @Post(':id/complete')
  @RequirePermissions('aiassistant:manage:messages')
  @ApiOperation({ summary: 'Complete assistant message generation' })
  complete(@Param('id', ParseUUIDPipe) id: string, @Body() dto: CompleteMessageDto) {
    return this.service.complete(id, dto);
  }

  @Post(':id/fail')
  @RequirePermissions('aiassistant:manage:messages')
  @ApiOperation({ summary: 'Mark assistant message as failed' })
  fail(@Param('id', ParseUUIDPipe) id: string, @Body() dto: FailMessageDto) {
    return this.service.fail(id, dto);
  }
}
