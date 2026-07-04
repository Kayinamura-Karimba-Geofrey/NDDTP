import {
  Controller, Get, Post, Delete, Body, Param, Query, UseGuards, ParseUUIDPipe, HttpCode, HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AssignmentService } from './assignment.service';
import { AssignRoleDto, RevokeRoleDto, AssignmentFilterDto } from './dto/assignment.dto';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { PermissionsGuard } from '../../guards/permissions.guard';
import { RequirePermissions } from '../../decorators/auth.decorators';
import { CurrentUser, CorrelationId } from '../../decorators/current-user.decorator';

@ApiTags('Assignments')
@Controller('assignments')
@UseGuards(JwtAuthGuard, PermissionsGuard)
@ApiBearerAuth()
export class AssignmentController {
  constructor(private readonly assignmentService: AssignmentService) {}

  @Post()
  @RequirePermissions('authorization:assign:roles')
  @ApiOperation({ summary: 'Assign role to user' })
  assign(
    @Body() dto: AssignRoleDto,
    @CurrentUser('sub') userId: string,
    @CorrelationId() cid: string,
  ) {
    return this.assignmentService.assignRole(dto, userId, cid);
  }

  @Get('user/:userId')
  @RequirePermissions('authorization:assign:roles')
  @ApiOperation({ summary: 'Get user role assignments' })
  getUserAssignments(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Query() filter: AssignmentFilterDto,
  ) {
    return this.assignmentService.getUserAssignments(userId, filter);
  }

  @Delete(':id')
  @RequirePermissions('authorization:assign:roles')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Revoke role assignment' })
  revoke(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: RevokeRoleDto,
    @CurrentUser('sub') userId: string,
    @CorrelationId() cid: string,
  ) {
    return this.assignmentService.revokeAssignment(id, userId, dto.reason, cid);
  }
}
