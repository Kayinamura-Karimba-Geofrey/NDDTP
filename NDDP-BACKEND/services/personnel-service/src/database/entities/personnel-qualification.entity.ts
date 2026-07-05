import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index, ManyToOne, JoinColumn,
} from 'typeorm';
import { QualificationStatus } from '../../common/enums';
import { PersonnelRecord } from './personnel-record.entity';
import { Qualification } from './qualification.entity';

@Entity('personnel_qualifications')
@Index('idx_pq_personnel', ['personnelRecordId'])
@Index('idx_pq_qualification', ['qualificationId'])
export class PersonnelQualification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'personnel_record_id', type: 'uuid' })
  personnelRecordId: string;

  @Column({ name: 'qualification_id', type: 'uuid' })
  qualificationId: string;

  @Column({ name: 'obtained_date', type: 'date' })
  obtainedDate: string;

  @Column({ name: 'expiry_date', type: 'date', nullable: true })
  expiryDate: string | null;

  @Column({ name: 'certification_number', type: 'varchar', length: 100, nullable: true })
  certificationNumber: string | null;

  @Column({ name: 'issuing_authority', type: 'varchar', length: 200, nullable: true })
  issuingAuthority: string | null;

  @Column({ type: 'enum', enum: QualificationStatus, default: QualificationStatus.ACTIVE })
  status: QualificationStatus;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @ManyToOne(() => PersonnelRecord, (pr) => pr.qualifications)
  @JoinColumn({ name: 'personnel_record_id' })
  personnelRecord: PersonnelRecord;

  @ManyToOne(() => Qualification)
  @JoinColumn({ name: 'qualification_id' })
  qualification: Qualification;
}
