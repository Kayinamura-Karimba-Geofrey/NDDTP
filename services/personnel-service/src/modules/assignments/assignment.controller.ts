import { Controller, Get, Post, Patch, Param, Body, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AssignmentService } from './assignment.service';
import { CreateAssignmentDto, EndAssignmentDto } from './dto/assignment.dto';
import { RequirePermissions } from '../../decorators/auth.decorators';

@ApiTags('Assignments')
@ApiBearerAuth('access-token')
@Controller('assignments')
export class AssignmentController {
  constructor(private readonly service: AssignmentService) {}

  @Post('personnel/:personnelId')
  @RequirePermissions('personnel:write:profile')
  @ApiOperation({ summary: 'Create personnel assignment' })
  create(@Param('personnelId', ParseUUIDPipe) personnelId: string, @Body() dto: CreateAssignmentDto) {
    return this.service.create(personnelId, dto);
  }

  @Get('personnel/:personnelId')
  @RequirePermissions('personnel:read:profile')
  @ApiOperation({ summary: 'List assignments for personnel' })
  list(@Param('personnelId', ParseUUIDPipe) personnelId: string) {
    return this.service.getByPersonnel(personnelId);
  }

  @Patch(':id/end')
  @RequirePermissions('personnel:write:profile')
  @ApiOperation({ summary: 'End an assignment' })
  end(@Param('id', ParseUUIDPipe) id: string, @Body() dto: EndAssignmentDto) {
    return this.service.end(id, dto);
  }
}
