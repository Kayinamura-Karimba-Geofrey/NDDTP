import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { MovementService } from './movement.service';
import { RequirePermissions } from '../../decorators/auth.decorators';

@ApiTags('Asset Movements')
@ApiBearerAuth('access-token')
@Controller('movements')
export class MovementController {
  constructor(private readonly service: MovementService) {}

  @Get('asset/:assetId')
  @RequirePermissions('asset:read:assets')
  @ApiOperation({ summary: 'Get movement history for asset' })
  findByAsset(@Param('assetId', ParseUUIDPipe) assetId: string) {
    return this.service.findByAsset(assetId);
  }
}
