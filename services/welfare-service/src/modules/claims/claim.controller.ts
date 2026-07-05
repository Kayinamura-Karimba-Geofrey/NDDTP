import { Controller, Get, Post, Patch, Param, Query, Body, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ClaimService } from './claim.service';
import { CreateClaimDto, ApproveClaimDto, RejectClaimDto, DisburseClaimDto, ClaimFilterDto } from './dto/claim.dto';
import { RequirePermissions, CurrentUser } from '@nddtp/platform-core';
import { AuthenticatedUser } from '@nddtp/platform-core';
import { PaginationDto } from '@nddtp/platform-core';

@ApiTags('Welfare Claims')
@ApiBearerAuth('access-token')
@Controller('claims')
export class ClaimController {
  constructor(private readonly service: ClaimService) {}

  @Post()
  @RequirePermissions('welfare:read:claims')
  @ApiOperation({ summary: 'Create welfare claim (draft)' })
  create(@Body() dto: CreateClaimDto, @CurrentUser() user: AuthenticatedUser) {
    return this.service.create(user.sub, dto);
  }

  @Get('me')
  @RequirePermissions('welfare:read:claims')
  @ApiOperation({ summary: 'List my claims' })
  mine(@CurrentUser() user: AuthenticatedUser, @Query() query: PaginationDto) {
    return this.service.findMine(user.sub, query.page, query.limit);
  }

  @Get('pending-review')
  @RequirePermissions('welfare:manage:claims')
  @ApiOperation({ summary: 'List claims pending review' })
  pending(@Query() query: PaginationDto) {
    return this.service.findPendingReview(query.page, query.limit);
  }

  @Get()
  @RequirePermissions('welfare:manage:claims')
  @ApiOperation({ summary: 'List all claims (filtered)' })
  findAll(@Query() query: ClaimFilterDto) {
    return this.service.findAll(query);
  }

  @Get(':id')
  @RequirePermissions('welfare:read:claims')
  @ApiOperation({ summary: 'Get claim by ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findById(id);
  }

  @Post(':id/submit')
  @RequirePermissions('welfare:read:claims')
  @ApiOperation({ summary: 'Submit claim for review' })
  submit(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: AuthenticatedUser) {
    return this.service.submit(id, user.sub);
  }

  @Post(':id/approve')
  @RequirePermissions('welfare:manage:claims')
  @ApiOperation({ summary: 'Approve welfare claim' })
  approve(@Param('id', ParseUUIDPipe) id: string, @Body() dto: ApproveClaimDto, @CurrentUser() user: AuthenticatedUser) {
    return this.service.approve(id, user.sub, dto);
  }

  @Post(':id/reject')
  @RequirePermissions('welfare:manage:claims')
  @ApiOperation({ summary: 'Reject welfare claim' })
  reject(@Param('id', ParseUUIDPipe) id: string, @Body() dto: RejectClaimDto, @CurrentUser() user: AuthenticatedUser) {
    return this.service.reject(id, user.sub, dto);
  }

  @Post(':id/disburse')
  @RequirePermissions('welfare:manage:claims')
  @ApiOperation({ summary: 'Process disbursement for approved claim' })
  disburse(@Param('id', ParseUUIDPipe) id: string, @Body() dto: DisburseClaimDto, @CurrentUser() user: AuthenticatedUser) {
    return this.service.disburse(id, user.sub, dto);
  }

  @Patch(':id/cancel')
  @RequirePermissions('welfare:read:claims')
  @ApiOperation({ summary: 'Cancel welfare claim' })
  cancel(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: AuthenticatedUser) {
    return this.service.cancel(id, user.sub);
  }
}
