import { Controller, Get, Post, Param, Query, Body, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AssetService } from './asset.service';
import { CreateAssetDto, TransferAssetDto, DisposeAssetDto, AssetFilterDto } from './dto/asset.dto';
import { RequirePermissions, CurrentUser } from '@nddtp/platform-core';
import { AuthenticatedUser } from '@nddtp/platform-core';

@ApiTags('Assets')
@ApiBearerAuth('access-token')
@Controller('assets')
export class AssetController {
  constructor(private readonly service: AssetService) {}

  @Post()
  @RequirePermissions('asset:manage:assets')
  @ApiOperation({ summary: 'Register new asset' })
  register(@Body() dto: CreateAssetDto) {
    return this.service.register(dto);
  }

  @Get()
  @RequirePermissions('asset:read:assets')
  @ApiOperation({ summary: 'List assets (filtered)' })
  findAll(@Query() query: AssetFilterDto) {
    return this.service.findAll(query);
  }

  @Get(':id')
  @RequirePermissions('asset:read:assets')
  @ApiOperation({ summary: 'Get asset by ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findById(id);
  }

  @Post(':id/available')
  @RequirePermissions('asset:manage:assets')
  @ApiOperation({ summary: 'Mark asset as available' })
  makeAvailable(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.makeAvailable(id);
  }

  @Post(':id/transfer')
  @RequirePermissions('asset:manage:assets')
  @ApiOperation({ summary: 'Transfer asset to another unit' })
  transfer(@Param('id', ParseUUIDPipe) id: string, @Body() dto: TransferAssetDto, @CurrentUser() user: AuthenticatedUser) {
    return this.service.transfer(id, user.sub, dto);
  }

  @Post(':id/dispose')
  @RequirePermissions('asset:manage:assets')
  @ApiOperation({ summary: 'Dispose asset' })
  dispose(@Param('id', ParseUUIDPipe) id: string, @Body() dto: DisposeAssetDto, @CurrentUser() user: AuthenticatedUser) {
    return this.service.dispose(id, user.sub, dto);
  }
}
