import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../../src/modules/users/user.service';
import { UserRepository } from '../../src/modules/users/repositories/user.repository';
import { DepartmentRepository } from '../../src/modules/departments/repositories/department.repository';
import { UserAddressRepository, UserEmergencyContactRepository } from '../../src/modules/users/repositories/user-address.repository';
import { EventPublisherService } from '../../src/events/event-publisher.service';
import { RedisService } from '../../src/modules/cache/redis.module';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { DuplicateResourceException } from '../../src/common/exceptions/user.exceptions';
import { UserStatus } from '../../src/common/enums';

describe('UserService', () => {
  let service: UserService;
  let userRepo: jest.Mocked<UserRepository>;
  let eventPublisher: jest.Mocked<EventPublisherService>;

  const mockUser = {
    id: 'user-uuid',
    employeeNumber: 'EMP-001',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@defence.gov',
    status: UserStatus.PENDING,
    hasCredentials: false,
    departmentId: null,
    jobTitle: null,
    rank: null,
    createdAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: UserRepository, useValue: {
          findByEmail: jest.fn(), findByEmployeeNumber: jest.fn(),
          create: jest.fn().mockResolvedValue(mockUser),
          findById: jest.fn(), findAll: jest.fn(), update: jest.fn(), softDelete: jest.fn(),
        }},
        { provide: DepartmentRepository, useValue: { findById: jest.fn() }},
        { provide: UserAddressRepository, useValue: { create: jest.fn(), clearPrimary: jest.fn() }},
        { provide: UserEmergencyContactRepository, useValue: { create: jest.fn() }},
        { provide: EventPublisherService, useValue: { publishUserCreated: jest.fn(), publishUserUpdated: jest.fn(), publishUserDeactivated: jest.fn(), publishUserDeleted: jest.fn() }},
        { provide: RedisService, useValue: { get: jest.fn(), set: jest.fn(), del: jest.fn() }},
        { provide: ConfigService, useValue: { get: jest.fn().mockReturnValue(900) }},
        { provide: DataSource, useValue: { transaction: jest.fn() }},
      ],
    }).compile();

    service = module.get(UserService);
    userRepo = module.get(UserRepository);
    eventPublisher = module.get(EventPublisherService);
  });

  it('should create user and publish event', async () => {
    userRepo.findByEmail.mockResolvedValue(null);
    userRepo.findByEmployeeNumber.mockResolvedValue(null);

    const result = await service.create({
      employeeNumber: 'EMP-001',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@defence.gov',
    });

    expect(result.email).toBe('john@defence.gov');
    expect(eventPublisher.publishUserCreated).toHaveBeenCalled();
  });

  it('should reject duplicate email', async () => {
    userRepo.findByEmail.mockResolvedValue(mockUser as never);
    await expect(service.create({
      employeeNumber: 'EMP-002', firstName: 'Jane', lastName: 'Doe', email: 'john@defence.gov',
    })).rejects.toThrow(DuplicateResourceException);
  });
});
