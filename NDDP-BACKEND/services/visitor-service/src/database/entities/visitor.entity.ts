import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';
import { VisitorStatus, IdDocumentType } from '../../common/enums';

@Entity('visitors')
@Index('idx_visitors_id_number', ['idNumber'], { unique: true })
export class Visitor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'id_number', type: 'varchar', length: 50, unique: true })
  idNumber: string;

  @Column({ name: 'first_name', type: 'varchar', length: 100 })
  firstName: string;

  @Column({ name: 'last_name', type: 'varchar', length: 100 })
  lastName: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  organization: string | null;

  @Column({ name: 'id_document_type', type: 'enum', enum: IdDocumentType })
  idDocumentType: IdDocumentType;

  @Column({ type: 'varchar', length: 30, nullable: true })
  phone: string | null;

  @Column({ type: 'varchar', length: 200, nullable: true })
  email: string | null;

  @Column({ type: 'enum', enum: VisitorStatus, default: VisitorStatus.ACTIVE })
  status: VisitorStatus;

  @Column({ name: 'registered_by', type: 'uuid' })
  registeredBy: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
