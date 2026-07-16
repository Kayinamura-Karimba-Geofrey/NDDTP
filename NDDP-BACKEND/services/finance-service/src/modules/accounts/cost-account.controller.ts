import { Controller, Get, Post, Param, Query, Body, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CostAccountService } from './cost-account.service';
import { CreateCostAccountDto, AccountFilterDto } from './dto/cost-account.dto';
import { RequirePermissions } from '@nddtp/platform-core';

@ApiTags('Cost Accounts')
@ApiBearerAuth('access-token')
@Controller('accounts')
export class CostAccountController {
  constructor(private readonly service: CostAccountService) {}

  @Post()
  @RequirePermissions('finance:manage:accounts')
  @ApiOperation({ summary: 'Create cost account' })
  create(@Body() dto: CreateCostAccountDto) {
    return this.service.create(dto);
  }

  @Get('active')
  @RequirePermissions('finance:read:accounts')
  @ApiOperation({ summary: 'List active cost accounts' })
  findActive() {
    return this.service.findActive();
  }

  @Get()
  @RequirePermissions('finance:read:accounts')
  @ApiOperation({ summary: 'List cost accounts' })
  findAll(@Query() query: AccountFilterDto) {
    return this.service.findAll(query);
  }

  @Get(':id')
  @RequirePermissions('finance:read:accounts')
  @ApiOperation({ summary: 'Get cost account by ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findById(id);
  }
}
