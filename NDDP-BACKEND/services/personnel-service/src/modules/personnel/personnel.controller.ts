import { Controller, Get, Post, Patch, Param, Query, Body, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { PersonnelService } from './personnel.service';
import { CreatePersonnelRecordDto, UpdatePersonnelRecordDto, PersonnelFilterDto, CreateServiceHistoryDto } from './dto/personnel.dto';
import { RequirePermissions, CurrentUser } from '@nddtp/platform-core';
import { AuthenticatedUser } from '@nddtp/platform-core';

@ApiTags('Personnel Records')
@ApiBearerAuth('access-token')
@Controller('personnel')
export class PersonnelController {
  constructor(private readonly service: PersonnelService) {}

  @Post()
  @RequirePermissions('personnel:write:profile')
  @ApiOperation({ summary: 'Create personnel record' })
  create(@Body() dto: CreatePersonnelRecordDto) {
    return this.service.create(dto);
  }

  @Get()
  @RequirePermissions('personnel:read:profile')
  @ApiOperation({ summary: 'List personnel records' })
  findAll(@Query() query: PersonnelFilterDto) {
    return this.service.findAll(query);
  }

  @Get('users/:userId')
  @RequirePermissions('personnel:read:profile')
  @ApiOperation({ summary: 'Get personnel record by user ID' })
  findByUser(@Param('userId', ParseUUIDPipe) userId: string) {
    return this.service.findByUserId(userId);
  }

  @Get(':id')
  @RequirePermissions('personnel:read:profile')
  @ApiOperation({ summary: 'Get personnel record by ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findById(id);
  }

  @Patch(':id')
  @RequirePermissions('personnel:write:profile')
  @ApiOperation({ summary: 'Update personnel record' })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdatePersonnelRecordDto) {
    return this.service.update(id, dto);
  }

  @Get(':id/service-history')
  @RequirePermissions('personnel:read:profile')
  @ApiOperation({ summary: 'Get service history for personnel' })
  serviceHistory(@Param('id', ParseUUIDPipe) id: string, @Query() query: PersonnelFilterDto) {
    return this.service.getServiceHistory(id, query.page, query.limit);
  }

  @Post(':id/service-history')
  @RequirePermissions('personnel:write:profile')
  @ApiOperation({ summary: 'Record service history event' })
  addServiceHistory(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: CreateServiceHistoryDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.service.addServiceHistory(id, dto, user.sub);
  }
}
