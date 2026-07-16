import { Controller, Get, Post, Param, Body, Query, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { BiReportService } from './bi-report.service';
import {
  CreateBiReportDefinitionDto, CreateBiReportExecutionDto,
  CompleteBiReportExecutionDto, FailBiReportExecutionDto,
} from './dto/bi-report.dto';
import { RequirePermissions, CurrentUser } from '@nddtp/platform-core';
import { AuthenticatedUser } from '@nddtp/platform-core';
import { PaginationDto } from '@nddtp/platform-core';
import { ExecutionStatus } from '../../common/enums';

@ApiTags('BI Reports')
@ApiBearerAuth('access-token')
@Controller('reports')
export class BiReportController {
  constructor(private readonly service: BiReportService) {}

  @Post('definitions')
  @RequirePermissions('bi:manage:reports')
  @ApiOperation({ summary: 'Create BI report definition' })
  createDefinition(@Body() dto: CreateBiReportDefinitionDto) {
    return this.service.createDefinition(dto);
  }

  @Get('definitions')
  @RequirePermissions('bi:read:reports')
  @ApiOperation({ summary: 'List active report definitions' })
  findActiveDefinitions() {
    return this.service.findActiveDefinitions();
  }

  @Get('definitions/:id')
  @RequirePermissions('bi:read:reports')
  @ApiOperation({ summary: 'Get report definition by ID' })
  findDefinition(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findDefinitionById(id);
  }

  @Post('executions')
  @RequirePermissions('bi:read:reports')
  @ApiOperation({ summary: 'Submit report execution' })
  submitExecution(@CurrentUser() user: AuthenticatedUser, @Body() dto: CreateBiReportExecutionDto) {
    return this.service.submitExecution(user.sub, dto);
  }

  @Get('executions')
  @RequirePermissions('bi:manage:reports')
  @ApiOperation({ summary: 'List report executions' })
  findAllExecutions(@Query() pagination: PaginationDto, @Query('status') status?: ExecutionStatus, @Query('reportId') reportId?: string) {
    return this.service.findAllExecutions({ page: pagination.page, limit: pagination.limit, status, reportId });
  }

  @Get('executions/me')
  @RequirePermissions('bi:read:executions')
  @ApiOperation({ summary: 'List my report executions' })
  findMyExecutions(@CurrentUser() user: AuthenticatedUser, @Query() pagination: PaginationDto) {
    return this.service.findMyExecutions(user.sub, pagination.page, pagination.limit);
  }

  @Get('executions/:id')
  @RequirePermissions('bi:read:executions')
  @ApiOperation({ summary: 'Get report execution by ID' })
  findExecution(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findExecutionById(id);
  }

  @Post('executions/:id/process')
  @RequirePermissions('bi:manage:reports')
  @ApiOperation({ summary: 'Start report execution processing' })
  processExecution(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.processExecution(id);
  }

  @Post('executions/:id/complete')
  @RequirePermissions('bi:manage:reports')
  @ApiOperation({ summary: 'Complete report execution' })
  completeExecution(@Param('id', ParseUUIDPipe) id: string, @Body() dto: CompleteBiReportExecutionDto) {
    return this.service.completeExecution(id, dto);
  }

  @Post('executions/:id/fail')
  @RequirePermissions('bi:manage:reports')
  @ApiOperation({ summary: 'Mark report execution as failed' })
  failExecution(@Param('id', ParseUUIDPipe) id: string, @Body() dto: FailBiReportExecutionDto) {
    return this.service.failExecution(id, dto);
  }

  @Post('executions/:id/cancel')
  @RequirePermissions('bi:read:executions')
  @ApiOperation({ summary: 'Cancel own report execution' })
  cancelExecution(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: AuthenticatedUser) {
    return this.service.cancelExecution(id, user.sub);
  }

  @Post('executions/:id/cancel-staff')
  @RequirePermissions('bi:manage:reports')
  @ApiOperation({ summary: 'Cancel report execution (staff)' })
  cancelExecutionStaff(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: AuthenticatedUser) {
    return this.service.cancelExecution(id, user.sub, true);
  }
}
