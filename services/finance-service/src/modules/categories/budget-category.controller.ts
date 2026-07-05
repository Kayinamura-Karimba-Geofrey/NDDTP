import { Controller, Get, Post, Param, Body, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { BudgetCategoryService } from './budget-category.service';
import { CreateBudgetCategoryDto } from './dto/budget-category.dto';
import { RequirePermissions } from '../../decorators/auth.decorators';

@ApiTags('Budget Categories')
@ApiBearerAuth('access-token')
@Controller('categories')
export class BudgetCategoryController {
  constructor(private readonly service: BudgetCategoryService) {}

  @Post()
  @RequirePermissions('finance:manage:categories')
  @ApiOperation({ summary: 'Create budget category' })
  create(@Body() dto: CreateBudgetCategoryDto) {
    return this.service.create(dto);
  }

  @Get()
  @RequirePermissions('finance:read:categories')
  @ApiOperation({ summary: 'List active budget categories' })
  findActive() {
    return this.service.findActive();
  }

  @Get(':id')
  @RequirePermissions('finance:read:categories')
  @ApiOperation({ summary: 'Get budget category by ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findById(id);
  }
}
