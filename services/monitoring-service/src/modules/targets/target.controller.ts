import { Controller, Get, Post, Param, Body, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { TargetService } from './target.service';
import { CreateTargetDto } from './dto/target.dto';
import { RequirePermissions } from '../../decorators/auth.decorators';

@ApiTags('Monitoring Targets')
@ApiBearerAuth('access-token')
@Controller('targets')
export class TargetController {
  constructor(private readonly service: TargetService) {}

  @Post()
  @RequirePermissions('monitoring:manage:targets')
  @ApiOperation({ summary: 'Create monitoring target' })
  create(@Body() dto: CreateTargetDto) {
    return this.service.create(dto);
  }

  @Get()
  @RequirePermissions('monitoring:read:targets')
  @ApiOperation({ summary: 'List active monitoring targets' })
  findActive() {
    return this.service.findActive();
  }

  @Get(':id')
  @RequirePermissions('monitoring:read:targets')
  @ApiOperation({ summary: 'Get monitoring target by ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findById(id);
  }
}
