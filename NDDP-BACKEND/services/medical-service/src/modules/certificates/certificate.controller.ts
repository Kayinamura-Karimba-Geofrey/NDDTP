import { Controller, Get, Post, Param, Query, Body, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CertificateService } from './certificate.service';
import { CreateCertificateDto, IssueCertificateDto, RevokeCertificateDto, CertificateFilterDto } from './dto/certificate.dto';
import { RequirePermissions, CurrentUser } from '@nddtp/platform-core';
import { AuthenticatedUser } from '@nddtp/platform-core';
import { PaginationDto } from '@nddtp/platform-core';

@ApiTags('Medical Certificates')
@ApiBearerAuth('access-token')
@Controller('certificates')
export class CertificateController {
  constructor(private readonly service: CertificateService) {}

  @Post()
  @RequirePermissions('medical:manage:certificates')
  @ApiOperation({ summary: 'Create medical certificate (draft)' })
  create(@Body() dto: CreateCertificateDto, @CurrentUser() user: AuthenticatedUser) {
    return this.service.create(user.sub, dto);
  }

  @Get('me')
  @RequirePermissions('medical:read:certificates')
  @ApiOperation({ summary: 'List my certificates' })
  mine(@CurrentUser() user: AuthenticatedUser, @Query() query: PaginationDto) {
    return this.service.findMine(user.sub, query.page, query.limit);
  }

  @Get()
  @RequirePermissions('medical:manage:certificates')
  @ApiOperation({ summary: 'List all certificates (filtered)' })
  findAll(@Query() query: CertificateFilterDto) {
    return this.service.findAll(query);
  }

  @Get(':id')
  @RequirePermissions('medical:read:certificates')
  @ApiOperation({ summary: 'Get certificate by ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findById(id);
  }

  @Post(':id/issue')
  @RequirePermissions('medical:manage:certificates')
  @ApiOperation({ summary: 'Issue medical certificate' })
  issue(@Param('id', ParseUUIDPipe) id: string, @Body() dto: IssueCertificateDto, @CurrentUser() user: AuthenticatedUser) {
    return this.service.issue(id, user.sub, dto);
  }

  @Post(':id/revoke')
  @RequirePermissions('medical:manage:certificates')
  @ApiOperation({ summary: 'Revoke medical certificate' })
  revoke(@Param('id', ParseUUIDPipe) id: string, @Body() dto: RevokeCertificateDto) {
    return this.service.revoke(id, dto);
  }
}
