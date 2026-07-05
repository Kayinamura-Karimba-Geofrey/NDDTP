import { Controller, Get, Post, Param, Body, ParseUUIDPipe, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AnalyticsQueryService } from './analytics-query.service';
import { CreateAnalyticsQueryDto, CompleteAnalyticsQueryDto, FailAnalyticsQueryDto } from './dto/analytics-query.dto';
import { RequirePermissions, CurrentUser } from '../../decorators/auth.decorators';
import { AuthenticatedUser } from '../../common/interfaces';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { QueryStatus } from '../../common/enums';

@ApiTags('Analytics Queries')
@ApiBearerAuth('access-token')
@Controller('queries')
export class AnalyticsQueryController {
  constructor(private readonly service: AnalyticsQueryService) {}

  @Post()
  @RequirePermissions('analytics:manage:queries')
  @ApiOperation({ summary: 'Submit analytics query' })
  submit(@CurrentUser() user: AuthenticatedUser, @Body() dto: CreateAnalyticsQueryDto) {
    return this.service.submit(user.sub, dto);
  }

  @Get()
  @RequirePermissions('analytics:read:queries')
  @ApiOperation({ summary: 'List analytics queries' })
  findAll(@Query() pagination: PaginationDto, @Query('status') status?: QueryStatus) {
    return this.service.findAll({ page: pagination.page, limit: pagination.limit, status });
  }

  @Get('mine')
  @RequirePermissions('analytics:read:queries')
  @ApiOperation({ summary: 'List my analytics queries' })
  findMine(@CurrentUser() user: AuthenticatedUser, @Query() pagination: PaginationDto) {
    return this.service.findMine(user.sub, pagination.page, pagination.limit);
  }

  @Get(':id')
  @RequirePermissions('analytics:read:queries')
  @ApiOperation({ summary: 'Get analytics query by ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findById(id);
  }

  @Post(':id/process')
  @RequirePermissions('analytics:manage:queries')
  @ApiOperation({ summary: 'Start query processing' })
  process(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.process(id);
  }

  @Post(':id/complete')
  @RequirePermissions('analytics:manage:queries')
  @ApiOperation({ summary: 'Complete query with result' })
  complete(@Param('id', ParseUUIDPipe) id: string, @Body() dto: CompleteAnalyticsQueryDto) {
    return this.service.complete(id, dto);
  }

  @Post(':id/fail')
  @RequirePermissions('analytics:manage:queries')
  @ApiOperation({ summary: 'Mark query as failed' })
  fail(@Param('id', ParseUUIDPipe) id: string, @Body() dto: FailAnalyticsQueryDto) {
    return this.service.fail(id, dto);
  }

  @Post(':id/cancel')
  @RequirePermissions('analytics:manage:queries')
  @ApiOperation({ summary: 'Cancel analytics query' })
  cancel(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: AuthenticatedUser) {
    return this.service.cancel(id, user.sub);
  }
}
