import { Controller, Get, Post, Param, Body, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AgentService } from './agent.service';
import { CreateAgentDto } from './dto/agent.dto';
import { RequirePermissions } from '../../decorators/auth.decorators';

@ApiTags('AI Agents')
@ApiBearerAuth('access-token')
@Controller('agents')
export class AgentController {
  constructor(private readonly service: AgentService) {}

  @Post()
  @RequirePermissions('aiassistant:manage:agents')
  @ApiOperation({ summary: 'Create AI agent' })
  create(@Body() dto: CreateAgentDto) {
    return this.service.create(dto);
  }

  @Get()
  @RequirePermissions('aiassistant:read:agents')
  @ApiOperation({ summary: 'List active AI agents' })
  findActive() {
    return this.service.findActive();
  }

  @Get(':id')
  @RequirePermissions('aiassistant:read:agents')
  @ApiOperation({ summary: 'Get AI agent by ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findById(id);
  }
}
