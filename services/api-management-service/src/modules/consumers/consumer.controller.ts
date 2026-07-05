import { Controller, Get, Post, Param, Body, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ConsumerService } from './consumer.service';
import { CreateConsumerDto, IssueKeyDto } from './dto/consumer.dto';
import { RequirePermissions, CurrentUser } from '../../decorators/auth.decorators';
import { AuthenticatedUser } from '../../common/interfaces';

@ApiTags('API Consumers')
@ApiBearerAuth('access-token')
@Controller('consumers')
export class ConsumerController {
  constructor(private readonly service: ConsumerService) {}

  @Post()
  @RequirePermissions('apimanagement:manage:consumers')
  @ApiOperation({ summary: 'Create API consumer' })
  create(@Body() dto: CreateConsumerDto) {
    return this.service.create(dto);
  }

  @Get()
  @RequirePermissions('apimanagement:read:consumers')
  @ApiOperation({ summary: 'List active API consumers' })
  findActive() {
    return this.service.findActive();
  }

  @Get(':id')
  @RequirePermissions('apimanagement:read:consumers')
  @ApiOperation({ summary: 'Get API consumer by ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findById(id);
  }

  @Get(':id/keys')
  @RequirePermissions('apimanagement:read:consumers')
  @ApiOperation({ summary: 'List API keys for consumer' })
  findKeys(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findKeys(id);
  }

  @Post(':id/keys')
  @RequirePermissions('apimanagement:manage:consumers')
  @ApiOperation({ summary: 'Issue API key for consumer' })
  issueKey(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: IssueKeyDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.service.issueKey(id, user.sub, dto);
  }

  @Post(':id/suspend')
  @RequirePermissions('apimanagement:manage:consumers')
  @ApiOperation({ summary: 'Suspend API consumer' })
  suspend(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.suspend(id);
  }

  @Post('keys/:keyId/revoke')
  @RequirePermissions('apimanagement:manage:consumers')
  @ApiOperation({ summary: 'Revoke API key' })
  revokeKey(@Param('keyId', ParseUUIDPipe) keyId: string) {
    return this.service.revokeKey(keyId);
  }
}
