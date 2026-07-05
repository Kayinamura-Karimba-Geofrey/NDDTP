import { Controller, Get, Post, Param, Query, Body, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CertificationService } from './certification.service';
import { IssueCertificationDto, RevokeCertificationDto, CertificationFilterDto } from './dto/certification.dto';
import { RequirePermissions, CurrentUser } from '@nddtp/platform-core';
import { AuthenticatedUser } from '@nddtp/platform-core';
import { PaginationDto } from '@nddtp/platform-core';

@ApiTags('Training Certifications')
@ApiBearerAuth('access-token')
@Controller('certifications')
export class CertificationController {
  constructor(private readonly service: CertificationService) {}

  @Post()
  @RequirePermissions('training:manage:certifications')
  @ApiOperation({ summary: 'Issue training certification' })
  issue(@Body() dto: IssueCertificationDto, @CurrentUser() user: AuthenticatedUser) {
    return this.service.issue(user.sub, dto);
  }

  @Get('me')
  @RequirePermissions('training:read:certifications')
  @ApiOperation({ summary: 'List my certifications' })
  mine(@CurrentUser() user: AuthenticatedUser, @Query() query: PaginationDto) {
    return this.service.findMine(user.sub, query.page, query.limit);
  }

  @Get()
  @RequirePermissions('training:manage:certifications')
  @ApiOperation({ summary: 'List all certifications' })
  findAll(@Query() query: CertificationFilterDto) {
    return this.service.findAll(query);
  }

  @Get(':id')
  @RequirePermissions('training:read:certifications')
  @ApiOperation({ summary: 'Get certification by ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findById(id);
  }

  @Post(':id/revoke')
  @RequirePermissions('training:manage:certifications')
  @ApiOperation({ summary: 'Revoke certification' })
  revoke(@Param('id', ParseUUIDPipe) id: string, @Body() dto: RevokeCertificationDto) {
    return this.service.revoke(id, dto);
  }
}
