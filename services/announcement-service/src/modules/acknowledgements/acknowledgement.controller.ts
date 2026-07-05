import { Controller, Get, Post, Param, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AcknowledgementService } from './acknowledgement.service';
import { RequirePermissions, CurrentUser } from '../../decorators/auth.decorators';
import { AuthenticatedUser } from '../../common/interfaces';

@ApiTags('Acknowledgements')
@ApiBearerAuth('access-token')
@Controller('acknowledgements')
export class AcknowledgementController {
  constructor(private readonly service: AcknowledgementService) {}

  @Post('announcement/:announcementId')
  @RequirePermissions('announcement:read:announcements')
  @ApiOperation({ summary: 'Acknowledge announcement' })
  acknowledge(
    @Param('announcementId', ParseUUIDPipe) announcementId: string,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.service.acknowledge(announcementId, user.sub);
  }

  @Get('mine')
  @RequirePermissions('announcement:read:acknowledgements')
  @ApiOperation({ summary: 'List my acknowledgements' })
  findMine(@CurrentUser() user: AuthenticatedUser) {
    return this.service.findMine(user.sub);
  }

  @Get('announcement/:announcementId')
  @RequirePermissions('announcement:read:acknowledgements')
  @ApiOperation({ summary: 'List acknowledgements for announcement' })
  findByAnnouncement(@Param('announcementId', ParseUUIDPipe) announcementId: string) {
    return this.service.findByAnnouncement(announcementId);
  }

  @Get('announcement/:announcementId/count')
  @RequirePermissions('announcement:read:acknowledgements')
  @ApiOperation({ summary: 'Count acknowledgements for announcement' })
  countByAnnouncement(@Param('announcementId', ParseUUIDPipe) announcementId: string) {
    return this.service.countByAnnouncement(announcementId);
  }
}
