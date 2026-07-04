import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index,
} from 'typeorm';
import { CertificateType, CertificateStatus } from '../../common/enums';

@Entity('medical_certificates')
@Index('idx_medical_certificates_user', ['userId'])
@Index('idx_medical_certificates_number', ['certificateNumber'], { unique: true })
export class MedicalCertificate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'certificate_number', type: 'varchar', length: 50, unique: true })
  certificateNumber: string;

  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;

  @Column({ type: 'enum', enum: CertificateType })
  type: CertificateType;

  @Column({ type: 'enum', enum: CertificateStatus, default: CertificateStatus.DRAFT })
  status: CertificateStatus;

  @Column({ type: 'text' })
  description: string;

  @Column({ name: 'valid_from', type: 'date', nullable: true })
  validFrom: string | null;

  @Column({ name: 'valid_until', type: 'date', nullable: true })
  validUntil: string | null;

  @Column({ name: 'issued_by', type: 'uuid', nullable: true })
  issuedBy: string | null;

  @Column({ name: 'issued_at', type: 'timestamptz', nullable: true })
  issuedAt: Date | null;

  @Column({ name: 'revoked_reason', type: 'text', nullable: true })
  revokedReason: string | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
