import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { RolePermission } from '../../../database/entities/role-permission.entity';

@Injectable()
export class RolePermissionRepository {
  constructor(@InjectRepository(RolePermission) private readonly repo: Repository<RolePermission>) {}

  async grant(roleId: string, permissionIds: string[], grantedBy?: string): Promise<void> {
    for (const permissionId of permissionIds) {
      const existing = await this.repo.findOne({ where: { roleId, permissionId } });
      if (!existing) {
        await this.repo.save(this.repo.create({ roleId, permissionId, grantedBy: grantedBy || null }));
      }
    }
  }

  async revoke(roleId: string, permissionIds: string[]): Promise<void> {
    await this.repo.delete({ roleId, permissionId: In(permissionIds) });
  }

  async revokeAll(roleId: string): Promise<void> {
    await this.repo.delete({ roleId });
  }

  findByRoleId(roleId: string): Promise<RolePermission[]> {
    return this.repo.find({ where: { roleId }, relations: ['permission'] });
  }

  async findPermissionCodesByRoleIds(roleIds: string[]): Promise<string[]> {
    if (!roleIds.length) return [];
    const results = await this.repo
      .createQueryBuilder('rp')
      .innerJoin('rp.permission', 'p')
      .where('rp.role_id IN (:...roleIds)', { roleIds })
      .andWhere('p.status = :status', { status: 'ACTIVE' })
      .andWhere('p.deleted_at IS NULL')
      .select('p.code', 'code')
      .getRawMany<{ code: string }>();
    return [...new Set(results.map((r) => r.code))];
  }
}
