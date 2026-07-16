import { Controller, Get, Post, Param, Query, Body, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { FitnessService } from './fitness.service';
import { CreateFitnessDto, RevokeFitnessDto, FitnessFilterDto } from './dto/fitness.dto';
import { RequirePermissions, CurrentUser } from '@nddtp/platform-core';
import { AuthenticatedUser } from '@nddtp/platform-core';

@ApiTags('Fitness Assessments')
@ApiBearerAuth('access-token')
@Controller('fitness')
export class FitnessController {
  constructor(private readonly service: FitnessService) {}

  @Post()
  @RequirePermissions('medical:manage:fitness')
  @ApiOperation({ summary: 'Create fitness assessment' })
  assess(@Body() dto: CreateFitnessDto, @CurrentUser() user: AuthenticatedUser) {
    return this.service.assess(user.sub, dto);
  }

  @Get('me')
  @RequirePermissions('medical:read:fitness')
  @ApiOperation({ summary: 'Get my current fitness status' })
  myStatus(@CurrentUser() user: AuthenticatedUser) {
    return this.service.getCurrent(user.sub);
  }

  @Get()
  @RequirePermissions('medical:manage:fitness')
  @ApiOperation({ summary: 'List fitness assessments' })
  findAll(@Query() query: FitnessFilterDto) {
    return this.service.findAll(query);
  }

  @Get(':id')
  @RequirePermissions('medical:read:fitness')
  @ApiOperation({ summary: 'Get fitness assessment by ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findById(id);
  }

  @Post(':id/revoke')
  @RequirePermissions('medical:manage:fitness')
  @ApiOperation({ summary: 'Revoke fitness assessment' })
  revoke(@Param('id', ParseUUIDPipe) id: string, @Body() dto: RevokeFitnessDto) {
    return this.service.revoke(id, dto);
  }
}
