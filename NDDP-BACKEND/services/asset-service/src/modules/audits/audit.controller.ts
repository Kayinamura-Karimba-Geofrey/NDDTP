import { Controller, Get, Post, Param, Query, Body, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuditService } from './audit.service';
import { CreateAuditDto, CompleteAuditDto, AuditFilterDto } from './dto/audit.dto';
import { RequirePermissions, CurrentUser } from '@nddtp/platform-core';
import { AuthenticatedUser } from '@nddtp/platform-core';

@ApiTags('Asset Audits')
@ApiBearerAuth('access-token')
@Controller('audits')
export class AuditController {
  constructor(private readonly service: AuditService) {}

  @Post()
  @RequirePermissions('asset:manage:audits')
  @ApiOperation({ summary: 'Schedule asset audit' })
  schedule(@Body() dto: CreateAuditDto, @CurrentUser() user: AuthenticatedUser) {
    return this.service.schedule(user.sub, dto);
  }

  @Get()
  @RequirePermissions('asset:read:audits')
  @ApiOperation({ summary: 'List asset audits' })
  findAll(@Query() query: AuditFilterDto) {
    return this.service.findAll(query);
  }

  @Get(':id')
  @RequirePermissions('asset:read:audits')
  @ApiOperation({ summary: 'Get audit by ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findById(id);
  }

  @Post(':id/start')
  @RequirePermissions('asset:manage:audits')
  @ApiOperation({ summary: 'Start asset audit' })
  start(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.start(id);
  }

  @Post(':id/complete')
  @RequirePermissions('asset:manage:audits')
  @ApiOperation({ summary: 'Complete asset audit with findings' })
  complete(@Param('id', ParseUUIDPipe) id: string, @Body() dto: CompleteAuditDto) {
    return this.service.complete(id, dto);
  }
}
