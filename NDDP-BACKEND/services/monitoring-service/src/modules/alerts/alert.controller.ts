import { Controller, Get, Post, Param, Query, Body, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AlertService } from './alert.service';
import { RaiseAlertDto, AlertFilterDto } from './dto/alert.dto';
import { RequirePermissions, CurrentUser } from '@nddtp/platform-core';
import { AuthenticatedUser } from '@nddtp/platform-core';

@ApiTags('Monitoring Alerts')
@ApiBearerAuth('access-token')
@Controller('alerts')
export class AlertController {
  constructor(private readonly service: AlertService) {}

  @Post()
  @RequirePermissions('monitoring:manage:alerts')
  @ApiOperation({ summary: 'Raise monitoring alert' })
  raise(@Body() dto: RaiseAlertDto) {
    return this.service.raise(dto);
  }

  @Get()
  @RequirePermissions('monitoring:read:alerts')
  @ApiOperation({ summary: 'List monitoring alerts' })
  findAll(@Query() query: AlertFilterDto) {
    return this.service.findAll(query);
  }

  @Get(':id')
  @RequirePermissions('monitoring:read:alerts')
  @ApiOperation({ summary: 'Get alert by ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findById(id);
  }

  @Post(':id/acknowledge')
  @RequirePermissions('monitoring:manage:alerts')
  @ApiOperation({ summary: 'Acknowledge alert' })
  acknowledge(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: AuthenticatedUser) {
    return this.service.acknowledge(id, user.sub);
  }

  @Post(':id/resolve')
  @RequirePermissions('monitoring:manage:alerts')
  @ApiOperation({ summary: 'Resolve alert' })
  resolve(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: AuthenticatedUser) {
    return this.service.resolve(id, user.sub);
  }

  @Post(':id/close')
  @RequirePermissions('monitoring:manage:alerts')
  @ApiOperation({ summary: 'Close alert' })
  close(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.close(id);
  }
}
