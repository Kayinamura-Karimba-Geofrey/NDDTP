import { Controller, Get, Post, Param, Query, Body, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { SessionService } from './session.service';
import { CreateSessionDto, SessionFilterDto } from './dto/session.dto';
import { RequirePermissions } from '@nddtp/platform-core';

@ApiTags('Training Sessions')
@ApiBearerAuth('access-token')
@Controller('sessions')
export class SessionController {
  constructor(private readonly service: SessionService) {}

  @Post()
  @RequirePermissions('training:manage:sessions')
  @ApiOperation({ summary: 'Schedule training session' })
  create(@Body() dto: CreateSessionDto) {
    return this.service.create(dto);
  }

  @Get()
  @RequirePermissions('training:read:sessions')
  @ApiOperation({ summary: 'List training sessions' })
  findAll(@Query() query: SessionFilterDto) {
    return this.service.findAll(query);
  }

  @Get(':id')
  @RequirePermissions('training:read:sessions')
  @ApiOperation({ summary: 'Get session by ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findById(id);
  }

  @Get(':id/availability')
  @RequirePermissions('training:read:sessions')
  @ApiOperation({ summary: 'Get session availability' })
  availability(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.getAvailableSlots(id);
  }

  @Post(':id/start')
  @RequirePermissions('training:manage:sessions')
  @ApiOperation({ summary: 'Start training session' })
  start(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.start(id);
  }

  @Post(':id/complete')
  @RequirePermissions('training:manage:sessions')
  @ApiOperation({ summary: 'Complete training session' })
  complete(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.complete(id);
  }

  @Post(':id/cancel')
  @RequirePermissions('training:manage:sessions')
  @ApiOperation({ summary: 'Cancel training session' })
  cancel(@Param('id', ParseUUIDPipe) id: string, @Body('reason') reason: string) {
    return this.service.cancel(id, reason);
  }
}
