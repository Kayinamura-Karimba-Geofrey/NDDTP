import { Controller, Get, Post, Patch, Param, Body, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { InterviewService } from './interview.service';
import { ScheduleInterviewDto, CompleteInterviewDto } from './dto/interview.dto';
import { RequirePermissions, CurrentUser } from '../../decorators/auth.decorators';
import { AuthenticatedUser } from '../../common/interfaces';

@ApiTags('Interviews')
@ApiBearerAuth('access-token')
@Controller('interviews')
export class InterviewController {
  constructor(private readonly service: InterviewService) {}

  @Post('applications/:applicationId')
  @RequirePermissions('recruitment:manage:applications')
  @ApiOperation({ summary: 'Schedule interview for application' })
  schedule(
    @Param('applicationId', ParseUUIDPipe) applicationId: string,
    @Body() dto: ScheduleInterviewDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.service.schedule(applicationId, dto, user.sub);
  }

  @Get('applications/:applicationId')
  @RequirePermissions('recruitment:read:applications')
  @ApiOperation({ summary: 'List interviews for application' })
  list(@Param('applicationId', ParseUUIDPipe) applicationId: string) {
    return this.service.findByApplication(applicationId);
  }

  @Post(':id/complete')
  @RequirePermissions('recruitment:manage:applications')
  @ApiOperation({ summary: 'Complete interview with feedback' })
  complete(@Param('id', ParseUUIDPipe) id: string, @Body() dto: CompleteInterviewDto) {
    return this.service.complete(id, dto);
  }

  @Patch(':id/cancel')
  @RequirePermissions('recruitment:manage:applications')
  @ApiOperation({ summary: 'Cancel scheduled interview' })
  cancel(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.cancel(id);
  }
}
