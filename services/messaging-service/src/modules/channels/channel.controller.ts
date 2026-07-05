import { Controller, Get, Post, Param, Body, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ChannelService } from './channel.service';
import { CreateChannelDto, AddChannelMemberDto } from './dto/channel.dto';
import { RequirePermissions, CurrentUser } from '../../decorators/auth.decorators';
import { AuthenticatedUser } from '../../common/interfaces';

@ApiTags('Channels')
@ApiBearerAuth('access-token')
@Controller('channels')
export class ChannelController {
  constructor(private readonly service: ChannelService) {}

  @Post()
  @RequirePermissions('messaging:manage:channels')
  @ApiOperation({ summary: 'Create messaging channel' })
  create(@CurrentUser() user: AuthenticatedUser, @Body() dto: CreateChannelDto) {
    return this.service.create(user.sub, dto);
  }

  @Get('mine')
  @RequirePermissions('messaging:read:channels')
  @ApiOperation({ summary: 'List my channels' })
  findMine(@CurrentUser() user: AuthenticatedUser) {
    return this.service.findMine(user.sub);
  }

  @Get(':id')
  @RequirePermissions('messaging:read:channels')
  @ApiOperation({ summary: 'Get channel by ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: AuthenticatedUser) {
    return this.service.findById(id, user.sub);
  }

  @Post(':id/members')
  @RequirePermissions('messaging:manage:channels')
  @ApiOperation({ summary: 'Add channel member' })
  addMember(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user: AuthenticatedUser,
    @Body() dto: AddChannelMemberDto,
  ) {
    return this.service.addMember(id, user.sub, dto);
  }

  @Post(':id/archive')
  @RequirePermissions('messaging:manage:channels')
  @ApiOperation({ summary: 'Archive channel' })
  archive(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: AuthenticatedUser) {
    return this.service.archive(id, user.sub);
  }
}
