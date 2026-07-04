import { Controller, Get, Put, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { PreferenceService } from './preference.service';
import { UpdatePreferenceDto } from '../notifications/dto/notification.dto';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { CurrentUser } from '../../decorators/current-user.decorator';

@ApiTags('Preferences')
@Controller('preferences')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class PreferenceController {
  constructor(private readonly preferenceService: PreferenceService) {}

  @Get()
  @ApiOperation({ summary: 'Get current user notification preferences' })
  getPreferences(@CurrentUser('sub') userId: string) {
    return this.preferenceService.getUserPreferences(userId);
  }

  @Put()
  @ApiOperation({ summary: 'Update notification preference' })
  updatePreference(@CurrentUser('sub') userId: string, @Body() dto: UpdatePreferenceDto) {
    return this.preferenceService.updatePreference(userId, dto);
  }
}
