import { Controller, Get, Post, Param, Query, Body, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { BudgetService } from './budget.service';
import { CreateBudgetDto, BudgetFilterDto } from './dto/budget.dto';
import { RequirePermissions } from '@nddtp/platform-core';

@ApiTags('Budget Allocations')
@ApiBearerAuth('access-token')
@Controller('budgets')
export class BudgetController {
  constructor(private readonly service: BudgetService) {}

  @Post()
  @RequirePermissions('finance:manage:budgets')
  @ApiOperation({ summary: 'Create budget allocation' })
  create(@Body() dto: CreateBudgetDto) {
    return this.service.create(dto);
  }

  @Get()
  @RequirePermissions('finance:read:budgets')
  @ApiOperation({ summary: 'List budget allocations' })
  findAll(@Query() query: BudgetFilterDto) {
    return this.service.findAll(query);
  }

  @Get(':id/available')
  @RequirePermissions('finance:read:budgets')
  @ApiOperation({ summary: 'Get available budget amount' })
  getAvailable(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.getAvailable(id);
  }

  @Post(':id/activate')
  @RequirePermissions('finance:manage:budgets')
  @ApiOperation({ summary: 'Activate budget allocation' })
  activate(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.activate(id);
  }

  @Get(':id')
  @RequirePermissions('finance:read:budgets')
  @ApiOperation({ summary: 'Get budget by ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findById(id);
  }
}
