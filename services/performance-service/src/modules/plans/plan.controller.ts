import { Controller, Get, Post, Param, Query, Body, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { PlanService } from './plan.service';
import { CreatePlanDto, PlanFilterDto } from './dto/plan.dto';
import { RequirePermissions, CurrentUser } from '../../decorators/auth.decorators';
import { AuthenticatedUser } from '../../common/interfaces';
import { PaginationDto } from '../../common/dto/pagination.dto';

@ApiTags('Improvement Plans')
@ApiBearerAuth('access-token')
@Controller('plans')
export class PlanController {
  constructor(private readonly service: PlanService) {}

  @Post()
  @RequirePermissions('performance:manage:plans')
  @ApiOperation({ summary: 'Create improvement plan' })
  create(@Body() dto: CreatePlanDto, @CurrentUser() user: AuthenticatedUser) {
    return this.service.create(user.sub, dto);
  }

  @Get('me')
  @RequirePermissions('performance:read:plans')
  @ApiOperation({ summary: 'List my improvement plans' })
  mine(@CurrentUser() user: AuthenticatedUser, @Query() query: PaginationDto) {
    return this.service.findMine(user.sub, query.page, query.limit);
  }

  @Get()
  @RequirePermissions('performance:manage:plans')
  @ApiOperation({ summary: 'List all improvement plans' })
  findAll(@Query() query: PlanFilterDto) {
    return this.service.findAll(query);
  }

  @Get(':id')
  @RequirePermissions('performance:read:plans')
  @ApiOperation({ summary: 'Get plan by ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findById(id);
  }

  @Post(':id/activate')
  @RequirePermissions('performance:manage:plans')
  @ApiOperation({ summary: 'Activate improvement plan' })
  activate(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.activate(id);
  }

  @Post(':id/complete')
  @RequirePermissions('performance:manage:plans')
  @ApiOperation({ summary: 'Complete improvement plan' })
  complete(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.complete(id);
  }

  @Post(':id/cancel')
  @RequirePermissions('performance:manage:plans')
  @ApiOperation({ summary: 'Cancel improvement plan' })
  cancel(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.cancel(id);
  }
}
