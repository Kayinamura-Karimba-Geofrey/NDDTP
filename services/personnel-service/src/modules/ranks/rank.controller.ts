import { Controller, Get, Post, Param, Body, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { RankService } from './rank.service';
import { CreateRankDto, PromotePersonnelDto } from './dto/rank.dto';
import { RequirePermissions, CurrentUser } from '../../decorators/auth.decorators';
import { AuthenticatedUser } from '../../common/interfaces';

@ApiTags('Ranks')
@ApiBearerAuth('access-token')
@Controller('ranks')
export class RankController {
  constructor(private readonly service: RankService) {}

  @Post()
  @RequirePermissions('personnel:write:profile')
  @ApiOperation({ summary: 'Create rank definition' })
  create(@Body() dto: CreateRankDto) { return this.service.create(dto); }

  @Get()
  @RequirePermissions('personnel:read:profile')
  @ApiOperation({ summary: 'List all ranks' })
  findAll() { return this.service.findAll(); }

  @Post('personnel/:personnelId/promote')
  @RequirePermissions('personnel:write:profile')
  @ApiOperation({ summary: 'Promote personnel to a new rank' })
  promote(
    @Param('personnelId', ParseUUIDPipe) personnelId: string,
    @Body() dto: PromotePersonnelDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.service.promote(personnelId, dto, user.sub);
  }

  @Get('personnel/:personnelId/history')
  @RequirePermissions('personnel:read:profile')
  @ApiOperation({ summary: 'Get rank history for personnel' })
  history(@Param('personnelId', ParseUUIDPipe) personnelId: string) {
    return this.service.getHistory(personnelId);
  }
}
