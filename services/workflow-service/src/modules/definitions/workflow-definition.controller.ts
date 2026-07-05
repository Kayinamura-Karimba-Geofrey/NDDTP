import { Controller, Get, Post, Param, Body, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { WorkflowDefinitionService } from './workflow-definition.service';
import { CreateWorkflowDefinitionDto } from './dto/workflow-definition.dto';
import { RequirePermissions } from '../../decorators/auth.decorators';

@ApiTags('Workflow Definitions')
@ApiBearerAuth('access-token')
@Controller('definitions')
export class WorkflowDefinitionController {
  constructor(private readonly service: WorkflowDefinitionService) {}

  @Post()
  @RequirePermissions('workflow:manage:definitions')
  @ApiOperation({ summary: 'Create workflow definition with steps' })
  create(@Body() dto: CreateWorkflowDefinitionDto) {
    return this.service.create(dto);
  }

  @Get()
  @RequirePermissions('workflow:read:definitions')
  @ApiOperation({ summary: 'List active workflow definitions' })
  findActive() {
    return this.service.findActive();
  }

  @Get(':id')
  @RequirePermissions('workflow:read:definitions')
  @ApiOperation({ summary: 'Get workflow definition by ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findById(id);
  }
}
