import { Controller, Get, Post, Param, Body, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { PolicyService } from './policy.service';
import { CreatePolicyDto } from './dto/policy.dto';
import { RequirePermissions } from '../../decorators/auth.decorators';

@ApiTags('Backup Policies')
@ApiBearerAuth('access-token')
@Controller('policies')
export class PolicyController {
  constructor(private readonly service: PolicyService) {}

  @Post()
  @RequirePermissions('backup:manage:policies')
  @ApiOperation({ summary: 'Create backup policy' })
  create(@Body() dto: CreatePolicyDto) {
    return this.service.create(dto);
  }

  @Get()
  @RequirePermissions('backup:read:policies')
  @ApiOperation({ summary: 'List active backup policies' })
  findActive() {
    return this.service.findActive();
  }

  @Get(':id')
  @RequirePermissions('backup:read:policies')
  @ApiOperation({ summary: 'Get backup policy by ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findById(id);
  }
}
