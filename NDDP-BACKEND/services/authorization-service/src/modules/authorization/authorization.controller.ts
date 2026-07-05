import { Controller, Get, Post, Body, Param, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthorizationEngineService } from './authorization-engine.service';
import {
  CheckPermissionDto,
  BulkCheckPermissionDto,
  AuthorizationCheckResponseDto,
  EffectivePermissionsResponseDto,
} from './dto/authorization.dto';
import { JwtAuthGuard } from '@nddtp/platform-core';
import { Public } from '@nddtp/platform-core';
import { CurrentUser, CorrelationId, ClientIp } from '../../decorators/current-user.decorator';

@ApiTags('Authorization')
@Controller('authorization')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AuthorizationController {
  constructor(private readonly authzEngine: AuthorizationEngineService) {}

  @Post('check')
  @ApiOperation({ summary: 'Check if user has a specific permission' })
  check(
    @Body() dto: CheckPermissionDto,
    @CurrentUser('sub') userId: string,
    @ClientIp() ip: string,
    @CorrelationId() cid: string,
  ): Promise<AuthorizationCheckResponseDto> {
    return this.authzEngine.checkFromDto(dto, userId, ip, cid);
  }

  @Post('check/bulk')
  @ApiOperation({ summary: 'Bulk permission check' })
  bulkCheck(
    @Body() dto: BulkCheckPermissionDto,
    @CurrentUser('sub') requestUserId: string,
  ) {
    const userId = dto.userId || requestUserId;
    return this.authzEngine.bulkCheck(userId, dto);
  }

  @Get('users/:userId/permissions')
  @ApiOperation({ summary: 'Get effective permissions for user' })
  getPermissions(@Param('userId', ParseUUIDPipe) userId: string): Promise<EffectivePermissionsResponseDto> {
    return this.authzEngine.getEffectivePermissions(userId);
  }

  @Get('users/:userId/roles')
  @ApiOperation({ summary: 'Get effective roles for user' })
  async getRoles(@Param('userId', ParseUUIDPipe) userId: string) {
    const effective = await this.authzEngine.getEffectivePermissions(userId);
    return { userId, roles: effective.roles, computedAt: effective.computedAt };
  }

  @Get('me/permissions')
  @ApiOperation({ summary: 'Get current user effective permissions' })
  getMyPermissions(@CurrentUser('sub') userId: string) {
    return this.authzEngine.getEffectivePermissions(userId);
  }
}
