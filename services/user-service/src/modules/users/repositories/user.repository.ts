import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { User } from '../../../database/entities/user.entity';
import { UserStatus } from '../../../common/enums';
import { PaginatedResult } from '@nddtp/platform-core';

@Injectable()
export class UserRepository {
  constructor(@InjectRepository(User) private readonly repo: Repository<User>) {}

  create(data: Partial<User>): Promise<User> {
    return this.repo.save(this.repo.create({ ...data, email: data.email?.toLowerCase() }));
  }

  findById(id: string): Promise<User | null> {
    return this.repo.findOne({
      where: { id, deletedAt: IsNull() },
      relations: ['department', 'addresses', 'emergencyContacts', 'supervisor'],
    });
  }

  findByEmail(email: string): Promise<User | null> {
    return this.repo.findOne({ where: { email: email.toLowerCase(), deletedAt: IsNull() } });
  }

  findByEmployeeNumber(num: string): Promise<User | null> {
    return this.repo.findOne({ where: { employeeNumber: num, deletedAt: IsNull() } });
  }

  async findAll(
    page: number, limit: number, search?: string, status?: UserStatus, departmentId?: string,
  ): Promise<PaginatedResult<User>> {
    const qb = this.repo.createQueryBuilder('u')
      .leftJoinAndSelect('u.department', 'd')
      .where('u.deleted_at IS NULL');

    if (status) qb.andWhere('u.status = :status', { status });
    if (departmentId) qb.andWhere('u.department_id = :departmentId', { departmentId });
    if (search) {
      qb.andWhere(
        '(u.first_name ILIKE :s OR u.last_name ILIKE :s OR u.email ILIKE :s OR u.employee_number ILIKE :s)',
        { s: `%${search}%` },
      );
    }

    const [data, total] = await qb.orderBy('u.last_name').addOrderBy('u.first_name')
      .skip((page - 1) * limit).take(limit).getManyAndCount();

    const totalPages = Math.ceil(total / limit);
    return { data, meta: { page, limit, total, totalPages, hasNextPage: page < totalPages, hasPreviousPage: page > 1 } };
  }

  update(id: string, data: Partial<User>): Promise<void> {
    const updateData: Record<string, unknown> = { ...data };
    if (data.email) updateData.email = data.email.toLowerCase();
    delete updateData.department;
    delete updateData.addresses;
    delete updateData.emergencyContacts;
    delete updateData.preferences;
    delete updateData.supervisor;
    return this.repo.update(id, updateData).then(() => undefined);
  }

  softDelete(id: string): Promise<void> {
    return this.repo.softDelete(id).then(() => undefined);
  }

  markCredentialsRegistered(id: string): Promise<void> {
    return this.repo.update(id, {
      hasCredentials: true,
      credentialsRegisteredAt: new Date(),
      status: UserStatus.ACTIVE,
    }).then(() => undefined);
  }
}
