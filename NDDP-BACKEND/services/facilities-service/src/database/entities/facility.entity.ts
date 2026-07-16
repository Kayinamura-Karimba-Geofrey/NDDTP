import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { FacilityStatus } from '../../common/enums';
import { FacilityType } from './facility-type.entity';
import { FacilitySpace } from './facility-space.entity';

@Entity('facilities')
@Index('idx_facilities_code', ['code'], { unique: true })
export class Facility {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  code: string;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ name: 'type_id', type: 'uuid' })
  typeId: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  location: string | null;

  @Column({ type: 'int', default: 0 })
  capacity: number;

  @Column({ type: 'enum', enum: FacilityStatus, default: FacilityStatus.ACTIVE })
  status: FacilityStatus;

  @Column({ type: 'text', nullable: true })
  notes: string | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @ManyToOne(() => FacilityType)
  @JoinColumn({ name: 'type_id' })
  type: FacilityType;

  @OneToMany(() => FacilitySpace, (s) => s.facility)
  spaces: FacilitySpace[];
}
