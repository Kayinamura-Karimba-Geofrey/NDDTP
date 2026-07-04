import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorizationDecisionLog } from '../../database/entities/authorization-decision-log.entity';
import { UserRoleAssignment } from '../../database/entities/user-role-assignment.entity';
import { Role } from '../../database/entities/role.entity';
import { RolePermission } from '../../database/entities/role-permission.entity';
import { AuthorizationController } from './authorization.controller';
import { AuthorizationEngineService } from './authorization-engine.service';
import { AuthorizationDecisionLogRepository } from './repositories/authorization-decision-log.repository';
import { UserRoleAssignmentRepository } from '../assignments/repositories/user-role-assignment.repository';
import { RoleRepository } from '../roles/repositories/role.repository';
import { RolePermissionRepository } from '../roles/repositories/role-permission.repository';
import { EventsModule } from '../../events/events.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthorizationDecisionLog, UserRoleAssignment, Role, RolePermission]),
    EventsModule,
  ],
  controllers: [AuthorizationController],
  providers: [
    AuthorizationEngineService,
    AuthorizationDecisionLogRepository,
    UserRoleAssignmentRepository,
    RoleRepository,
    RolePermissionRepository,
  ],
  exports: [AuthorizationEngineService],
})
export class AuthorizationModule {}
