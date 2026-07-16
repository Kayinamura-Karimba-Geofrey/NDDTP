import { Controller, Get, Post, Patch, Param, Query, Body, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { GoalService } from './goal.service';
import { CreateGoalDto, UpdateGoalProgressDto, GoalFilterDto } from './dto/goal.dto';
import { RequirePermissions, CurrentUser } from '@nddtp/platform-core';
import { AuthenticatedUser } from '@nddtp/platform-core';
import { PaginationDto } from '@nddtp/platform-core';

@ApiTags('Performance Goals')
@ApiBearerAuth('access-token')
@Controller('goals')
export class GoalController {
  constructor(private readonly service: GoalService) {}

  @Post()
  @RequirePermissions('performance:read:goals')
  @ApiOperation({ summary: 'Create performance goal' })
  create(@Body() dto: CreateGoalDto, @CurrentUser() user: AuthenticatedUser) {
    return this.service.create(user.sub, dto);
  }

  @Get('me')
  @RequirePermissions('performance:read:goals')
  @ApiOperation({ summary: 'List my goals' })
  mine(@CurrentUser() user: AuthenticatedUser, @Query() query: PaginationDto) {
    return this.service.findMine(user.sub, query.page, query.limit);
  }

  @Get()
  @RequirePermissions('performance:manage:goals')
  @ApiOperation({ summary: 'List all goals (filtered)' })
  findAll(@Query() query: GoalFilterDto) {
    return this.service.findAll(query);
  }

  @Get(':id')
  @RequirePermissions('performance:read:goals')
  @ApiOperation({ summary: 'Get goal by ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findById(id);
  }

  @Patch(':id/progress')
  @RequirePermissions('performance:read:goals')
  @ApiOperation({ summary: 'Update goal progress' })
  updateProgress(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateGoalProgressDto, @CurrentUser() user: AuthenticatedUser) {
    return this.service.updateProgress(id, user.sub, dto);
  }
}
