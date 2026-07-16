import { Controller, Get, Post, Patch, Param, Body, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { DashboardService } from './dashboard.service';
import { CreateDashboardDto, UpdateDashboardStatusDto } from './dto/dashboard.dto';
import { RequirePermissions, CurrentUser } from '@nddtp/platform-core';
import { AuthenticatedUser } from '@nddtp/platform-core';

@ApiTags('Dashboards')
@ApiBearerAuth('access-token')
@Controller('dashboards')
export class DashboardController {
  constructor(private readonly service: DashboardService) {}

  @Post()
  @RequirePermissions('analytics:manage:dashboards')
  @ApiOperation({ summary: 'Create dashboard' })
  create(@CurrentUser() user: AuthenticatedUser, @Body() dto: CreateDashboardDto) {
    return this.service.create(user.sub, dto);
  }

  @Get()
  @RequirePermissions('analytics:read:dashboards')
  @ApiOperation({ summary: 'List active dashboards' })
  findActive() {
    return this.service.findActive();
  }

  @Get('mine')
  @RequirePermissions('analytics:read:dashboards')
  @ApiOperation({ summary: 'List my dashboards' })
  findMine(@CurrentUser() user: AuthenticatedUser) {
    return this.service.findMine(user.sub);
  }

  @Get(':id')
  @RequirePermissions('analytics:read:dashboards')
  @ApiOperation({ summary: 'Get dashboard by ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findById(id);
  }

  @Post(':id/activate')
  @RequirePermissions('analytics:manage:dashboards')
  @ApiOperation({ summary: 'Activate dashboard' })
  activate(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: AuthenticatedUser) {
    return this.service.activate(id, user.sub);
  }

  @Patch(':id/status')
  @RequirePermissions('analytics:manage:dashboards')
  @ApiOperation({ summary: 'Update dashboard status' })
  updateStatus(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateDashboardStatusDto) {
    return this.service.updateStatus(id, dto);
  }
}
