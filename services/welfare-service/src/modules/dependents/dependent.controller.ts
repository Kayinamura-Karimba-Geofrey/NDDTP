import { Controller, Get, Post, Patch, Delete, Param, Body, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { DependentService } from './dependent.service';
import { CreateDependentDto, UpdateDependentDto } from './dto/dependent.dto';
import { RequirePermissions, CurrentUser } from '../../decorators/auth.decorators';
import { AuthenticatedUser } from '../../common/interfaces';

@ApiTags('Dependents')
@ApiBearerAuth('access-token')
@Controller('dependents')
export class DependentController {
  constructor(private readonly service: DependentService) {}

  @Post()
  @RequirePermissions('welfare:read:claims')
  @ApiOperation({ summary: 'Register a dependent' })
  create(@Body() dto: CreateDependentDto, @CurrentUser() user: AuthenticatedUser) {
    return this.service.create(user.sub, dto);
  }

  @Get('me')
  @RequirePermissions('welfare:read:claims')
  @ApiOperation({ summary: 'List my dependents' })
  mine(@CurrentUser() user: AuthenticatedUser) { return this.service.findByUser(user.sub); }

  @Get(':id')
  @RequirePermissions('welfare:read:claims')
  @ApiOperation({ summary: 'Get dependent by ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: AuthenticatedUser) {
    return this.service.findById(id, user.sub);
  }

  @Patch(':id')
  @RequirePermissions('welfare:read:claims')
  @ApiOperation({ summary: 'Update dependent' })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateDependentDto, @CurrentUser() user: AuthenticatedUser) {
    return this.service.update(id, user.sub, dto);
  }

  @Delete(':id')
  @RequirePermissions('welfare:read:claims')
  @ApiOperation({ summary: 'Remove dependent' })
  remove(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: AuthenticatedUser) {
    return this.service.remove(id, user.sub);
  }
}
