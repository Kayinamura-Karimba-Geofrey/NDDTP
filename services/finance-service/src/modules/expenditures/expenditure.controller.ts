import { Controller, Get, Post, Param, Query, Body, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ExpenditureService } from './expenditure.service';
import { CreateExpenditureDto, RejectExpenditureDto, ExpenditureFilterDto } from './dto/expenditure.dto';
import { RequirePermissions, CurrentUser } from '../../decorators/auth.decorators';
import { AuthenticatedUser } from '../../common/interfaces';
import { PaginationDto } from '../../common/dto/pagination.dto';

@ApiTags('Expenditure Requests')
@ApiBearerAuth('access-token')
@Controller('expenditures')
export class ExpenditureController {
  constructor(private readonly service: ExpenditureService) {}

  @Post()
  @RequirePermissions('finance:read:expenditures')
  @ApiOperation({ summary: 'Create expenditure request (draft)' })
  create(@Body() dto: CreateExpenditureDto, @CurrentUser() user: AuthenticatedUser) {
    return this.service.create(user.sub, dto);
  }

  @Get('me')
  @RequirePermissions('finance:read:expenditures')
  @ApiOperation({ summary: 'List my expenditure requests' })
  mine(@CurrentUser() user: AuthenticatedUser, @Query() query: PaginationDto) {
    return this.service.findMine(user.sub, query.page, query.limit);
  }

  @Get('pending')
  @RequirePermissions('finance:manage:expenditures')
  @ApiOperation({ summary: 'List pending expenditure requests' })
  pending(@Query() query: PaginationDto) {
    return this.service.findPending(query.page, query.limit);
  }

  @Get()
  @RequirePermissions('finance:manage:expenditures')
  @ApiOperation({ summary: 'List expenditure requests' })
  findAll(@Query() query: ExpenditureFilterDto) {
    return this.service.findAll(query);
  }

  @Get(':id')
  @RequirePermissions('finance:read:expenditures')
  @ApiOperation({ summary: 'Get expenditure by ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findById(id);
  }

  @Get(':id/transactions')
  @RequirePermissions('finance:read:expenditures')
  @ApiOperation({ summary: 'Get payment transactions for expenditure' })
  findTransactions(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findTransactions(id);
  }

  @Post(':id/submit')
  @RequirePermissions('finance:read:expenditures')
  @ApiOperation({ summary: 'Submit expenditure for approval' })
  submit(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: AuthenticatedUser) {
    return this.service.submit(id, user.sub);
  }

  @Post(':id/approve')
  @RequirePermissions('finance:manage:expenditures')
  @ApiOperation({ summary: 'Approve expenditure' })
  approve(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: AuthenticatedUser) {
    return this.service.approve(id, user.sub);
  }

  @Post(':id/reject')
  @RequirePermissions('finance:manage:expenditures')
  @ApiOperation({ summary: 'Reject expenditure' })
  reject(@Param('id', ParseUUIDPipe) id: string, @Body() dto: RejectExpenditureDto, @CurrentUser() user: AuthenticatedUser) {
    return this.service.reject(id, user.sub, dto);
  }

  @Post(':id/pay')
  @RequirePermissions('finance:manage:expenditures')
  @ApiOperation({ summary: 'Record payment for approved expenditure' })
  pay(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: AuthenticatedUser) {
    return this.service.pay(id, user.sub);
  }

  @Post(':id/cancel')
  @RequirePermissions('finance:read:expenditures')
  @ApiOperation({ summary: 'Cancel own expenditure' })
  cancel(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: AuthenticatedUser) {
    return this.service.cancel(id, user.sub, false);
  }

  @Post(':id/cancel-staff')
  @RequirePermissions('finance:manage:expenditures')
  @ApiOperation({ summary: 'Cancel expenditure (staff)' })
  cancelStaff(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: AuthenticatedUser) {
    return this.service.cancel(id, user.sub, true);
  }
}
