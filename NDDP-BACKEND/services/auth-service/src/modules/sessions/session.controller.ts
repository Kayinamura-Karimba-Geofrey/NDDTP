import {
  Controller,
  Get,
  Delete,
  Param,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { SessionService } from './session.service';
import { SessionFilterDto } from '../auth/dto/auth-filter.dto';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { CurrentUser, CorrelationId } from '../../decorators/current-user.decorator';
import { MessageResponseDto } from '../auth/dto/auth-response.dto';

@ApiTags('Sessions')
@Controller('sessions')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Get()
  @ApiOperation({ summary: 'List active user sessions' })
  async listSessions(
    @CurrentUser('sub') userId: string,
    @CurrentUser('sessionId') sessionId: string,
    @Query() filter: SessionFilterDto,
  ) {
    return this.sessionService.getUserSessions(userId, filter, sessionId);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Revoke a specific session' })
  @ApiResponse({ status: 200, type: MessageResponseDto })
  async revokeSession(
    @CurrentUser('sub') userId: string,
    @Param('id', ParseUUIDPipe) sessionId: string,
    @CorrelationId() correlationId: string,
  ) {
    return this.sessionService.revokeSession(userId, sessionId, correlationId);
  }

  @Delete()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Revoke all sessions except current' })
  @ApiResponse({ status: 200, type: MessageResponseDto })
  async revokeAllSessions(
    @CurrentUser('sub') userId: string,
    @CurrentUser('sessionId') sessionId: string,
    @CorrelationId() correlationId: string,
  ) {
    return this.sessionService.revokeAllSessions(userId, sessionId, correlationId);
  }
}
