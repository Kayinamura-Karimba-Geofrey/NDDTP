import { Controller, Get, Post, Param, Query, Body, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { RestoreService } from './restore.service';
import { CreateRestoreDto, FailRestoreDto, CompleteRestoreDto, RestoreFilterDto } from './dto/restore.dto';
import { RequirePermissions, CurrentUser } from '../../decorators/auth.decorators';
import { AuthenticatedUser } from '../../common/interfaces';
import { PaginationDto } from '../../common/dto/pagination.dto';

@ApiTags('Backup Restores')
@ApiBearerAuth('access-token')
@Controller('restores')
export class RestoreController {
  constructor(private readonly service: RestoreService) {}

  @Post()
  @RequirePermissions('backup:read:restores')
  @ApiOperation({ summary: 'Submit restore request' })
  submit(@Body() dto: CreateRestoreDto, @CurrentUser() user: AuthenticatedUser) {
    return this.service.submit(user.sub, dto);
  }

  @Get('me')
  @RequirePermissions('backup:read:restores')
  @ApiOperation({ summary: 'List my restore requests' })
  mine(@CurrentUser() user: AuthenticatedUser, @Query() query: PaginationDto) {
    return this.service.findMine(user.sub, query.page, query.limit);
  }

  @Get()
  @RequirePermissions('backup:manage:restores')
  @ApiOperation({ summary: 'List restore requests' })
  findAll(@Query() query: RestoreFilterDto) {
    return this.service.findAll(query);
  }

  @Get(':id')
  @RequirePermissions('backup:read:restores')
  @ApiOperation({ summary: 'Get restore request by ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findById(id);
  }

  @Post(':id/start')
  @RequirePermissions('backup:manage:restores')
  @ApiOperation({ summary: 'Start restore operation' })
  start(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.start(id);
  }

  @Post(':id/complete')
  @RequirePermissions('backup:manage:restores')
  @ApiOperation({ summary: 'Complete restore operation' })
  complete(@Param('id', ParseUUIDPipe) id: string, @Body() dto: CompleteRestoreDto) {
    return this.service.complete(id, dto);
  }

  @Post(':id/fail')
  @RequirePermissions('backup:manage:restores')
  @ApiOperation({ summary: 'Mark restore as failed' })
  fail(@Param('id', ParseUUIDPipe) id: string, @Body() dto: FailRestoreDto) {
    return this.service.fail(id, dto);
  }

  @Post(':id/cancel')
  @RequirePermissions('backup:read:restores')
  @ApiOperation({ summary: 'Cancel own restore request' })
  cancel(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: AuthenticatedUser) {
    return this.service.cancel(id, user.sub, false);
  }

  @Post(':id/cancel-staff')
  @RequirePermissions('backup:manage:restores')
  @ApiOperation({ summary: 'Cancel restore request (staff)' })
  cancelStaff(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: AuthenticatedUser) {
    return this.service.cancel(id, user.sub, true);
  }
}
