import { Controller, Get, Headers, Param, ParseUUIDPipe, UnauthorizedException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiHeader } from '@nestjs/swagger';
import { Public } from '@nddtp/platform-core';
import { AuthorizationEngineService } from '../authorization/authorization-engine.service';

@ApiTags('Internal')
@Controller('internal')
export class InternalController {
  constructor(private readonly authzEngine: AuthorizationEngineService) {}

  @Get('users/:userId/effective-permissions')
  @Public()
  @ApiOperation({ summary: 'Service-to-service effective permissions lookup' })
  @ApiHeader({ name: 'x-internal-service-key', required: true })
  getEffectivePermissions(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Headers('x-internal-service-key') serviceKey?: string,
  ) {
    const expected = process.env.INTERNAL_SERVICE_KEY || 'change_me_internal_service_key';
    if (!serviceKey || serviceKey !== expected) {
      throw new UnauthorizedException('Invalid internal service key');
    }
    return this.authzEngine.getEffectivePermissions(userId);
  }
}
