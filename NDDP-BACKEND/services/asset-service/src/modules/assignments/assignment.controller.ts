import { Controller, Get, Post, Param, Body, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AssignmentService } from './assignment.service';
import { AssignAssetDto, ReturnAssetDto } from './dto/assignment.dto';
import { RequirePermissions, CurrentUser } from '@nddtp/platform-core';
import { AuthenticatedUser } from '@nddtp/platform-core';

@ApiTags('Asset Assignments')
@ApiBearerAuth('access-token')
@Controller('assignments')
export class AssignmentController {
  constructor(private readonly service: AssignmentService) {}

  @Post()
  @RequirePermissions('asset:manage:assignments')
  @ApiOperation({ summary: 'Assign asset to user' })
  assign(@Body() dto: AssignAssetDto, @CurrentUser() user: AuthenticatedUser) {
    return this.service.assign(user.sub, dto);
  }

  @Get('user/:userId')
  @RequirePermissions('asset:read:assignments')
  @ApiOperation({ summary: 'List active assignments for user' })
  byUser(@Param('userId', ParseUUIDPipe) userId: string) {
    return this.service.findByUser(userId);
  }

  @Get('asset/:assetId')
  @RequirePermissions('asset:read:assignments')
  @ApiOperation({ summary: 'List assignment history for asset' })
  byAsset(@Param('assetId', ParseUUIDPipe) assetId: string) {
    return this.service.findByAsset(assetId);
  }

  @Post('asset/:assetId/return')
  @RequirePermissions('asset:manage:assignments')
  @ApiOperation({ summary: 'Return assigned asset' })
  returnAsset(@Param('assetId', ParseUUIDPipe) assetId: string, @Body() dto: ReturnAssetDto, @CurrentUser() user: AuthenticatedUser) {
    return this.service.return(assetId, user.sub, dto);
  }
}
