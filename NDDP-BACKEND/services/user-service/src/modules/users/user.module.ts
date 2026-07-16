import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, UserAddress, UserEmergencyContact } from '../../database/entities';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './repositories/user.repository';
import { UserAddressRepository, UserEmergencyContactRepository } from './repositories/user-address.repository';
import { DepartmentModule } from '../departments/department.module';
import { EventsModule } from '../../events/events.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserAddress, UserEmergencyContact]),
    DepartmentModule,
    EventsModule,
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository, UserAddressRepository, UserEmergencyContactRepository],
  exports: [UserService, UserRepository],
})
export class UserModule {}
