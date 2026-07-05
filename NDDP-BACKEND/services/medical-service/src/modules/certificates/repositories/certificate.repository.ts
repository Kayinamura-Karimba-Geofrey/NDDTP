import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MedicalCertificate } from '../../../database/entities/medical-certificate.entity';
import { CertificateType, CertificateStatus } from '../../../common/enums';

@Injectable()
export class CertificateRepository {
  constructor(@InjectRepository(MedicalCertificate) private readonly repo: Repository<MedicalCertificate>) {}

  create(data: Partial<MedicalCertificate>) { return this.repo.save(this.repo.create(data)); }
  update(id: string, data: Partial<MedicalCertificate>) { return this.repo.update(id, data as Record<string, unknown>); }
  findById(id: string) { return this.repo.findOne({ where: { id } }); }

  async findAll(page: number, limit: number, userId?: string, type?: CertificateType, status?: CertificateStatus) {
    const qb = this.repo.createQueryBuilder('c');
    if (userId) qb.andWhere('c.userId = :userId', { userId });
    if (type) qb.andWhere('c.type = :type', { type });
    if (status) qb.andWhere('c.status = :status', { status });
    const [data, total] = await qb.orderBy('c.createdAt', 'DESC').skip((page - 1) * limit).take(limit).getManyAndCount();
    const totalPages = Math.ceil(total / limit);
    return { data, meta: { page, limit, total, totalPages, hasNextPage: page < totalPages, hasPreviousPage: page > 1 } };
  }
}
