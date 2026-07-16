import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '../../database/entities/role.entity';
import { RolePermission } from '../../database/entities/role-permission.entity';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { RoleRepository } from './repositories/role.repository';
import { RolePermissionRepository } from './repositories/role-permission.repository';
import { EventsModule } from '../../events/events.module';

@Module({
  imports: [TypeOrmModule.forFeature([Role, RolePermission]), EventsModule],
  controllers: [RoleController],
  providers: [RoleService, RoleRepository, RolePermissionRepository],
  exports: [RoleService, RoleRepository, RolePermissionRepository],
})
export class RoleModule {}
