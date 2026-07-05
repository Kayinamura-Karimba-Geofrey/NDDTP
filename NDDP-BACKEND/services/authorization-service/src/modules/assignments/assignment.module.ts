import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRoleAssignment } from '../../database/entities/user-role-assignment.entity';
import { Role } from '../../database/entities/role.entity';
import { AssignmentController } from './assignment.controller';
import { AssignmentService } from './assignment.service';
import { UserRoleAssignmentRepository } from './repositories/user-role-assignment.repository';
import { RoleRepository } from '../roles/repositories/role.repository';
import { EventsModule } from '../../events/events.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRoleAssignment, Role]),
    forwardRef(() => EventsModule),
  ],
  controllers: [AssignmentController],
  providers: [AssignmentService, UserRoleAssignmentRepository, RoleRepository],
  exports: [AssignmentService, UserRoleAssignmentRepository],
})
export class AssignmentModule {}
