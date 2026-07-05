import { Controller, Get, Post, Param, Body, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CheckInService } from './check-in.service';
import { RecordCheckInDto } from './dto/check-in.dto';
import { RequirePermissions, CurrentUser } from '../../decorators/auth.decorators';
import { AuthenticatedUser } from '../../common/interfaces';

@ApiTags('Check-ins')
@ApiBearerAuth('access-token')
@Controller('checkins')
export class CheckInController {
  constructor(private readonly service: CheckInService) {}

  @Post()
  @RequirePermissions('visitor:manage:checkins')
  @ApiOperation({ summary: 'Record check-in or check-out' })
  record(@Body() dto: RecordCheckInDto, @CurrentUser() user: AuthenticatedUser) {
    return this.service.record(user.sub, dto);
  }

  @Get('visit/:visitId')
  @RequirePermissions('visitor:read:checkins')
  @ApiOperation({ summary: 'Get check-in logs for a visit' })
  findByVisit(@Param('visitId', ParseUUIDPipe) visitId: string) {
    return this.service.findByVisitId(visitId);
  }
}
