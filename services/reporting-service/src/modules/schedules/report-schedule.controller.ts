import { Controller, Get, Post, Param, Body, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ReportScheduleService } from './report-schedule.service';
import { CreateScheduleDto } from './dto/report-schedule.dto';
import { RequirePermissions, CurrentUser } from '../../decorators/auth.decorators';
import { AuthenticatedUser } from '../../common/interfaces';

@ApiTags('Report Schedules')
@ApiBearerAuth('access-token')
@Controller('schedules')
export class ReportScheduleController {
  constructor(private readonly service: ReportScheduleService) {}

  @Post()
  @RequirePermissions('reporting:manage:schedules')
  @ApiOperation({ summary: 'Create report schedule' })
  create(@Body() dto: CreateScheduleDto, @CurrentUser() user: AuthenticatedUser) {
    return this.service.create(user.sub, dto);
  }

  @Get()
  @RequirePermissions('reporting:read:schedules')
  @ApiOperation({ summary: 'List active report schedules' })
  findActive() {
    return this.service.findActive();
  }

  @Get(':id')
  @RequirePermissions('reporting:read:schedules')
  @ApiOperation({ summary: 'Get schedule by ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findById(id);
  }

  @Post(':id/deactivate')
  @RequirePermissions('reporting:manage:schedules')
  @ApiOperation({ summary: 'Deactivate report schedule' })
  deactivate(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.deactivate(id);
  }
}
