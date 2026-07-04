import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index, ManyToOne, JoinColumn } from 'typeorm';
import { SpaceType, SpaceStatus } from '../../common/enums';
import { Facility } from './facility.entity';

@Entity('facility_spaces')
@Index('idx_facility_spaces_code', ['facilityId', 'code'], { unique: true })
export class FacilitySpace {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'facility_id', type: 'uuid' })
  facilityId: string;

  @Column({ type: 'varchar', length: 50 })
  code: string;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ type: 'enum', enum: SpaceType })
  spaceType: SpaceType;

  @Column({ type: 'int', default: 1 })
  capacity: number;

  @Column({ type: 'enum', enum: SpaceStatus, default: SpaceStatus.AVAILABLE })
  status: SpaceStatus;

  @Column({ type: 'varchar', length: 100, nullable: true })
  floor: string | null;

  @Column({ type: 'text', nullable: true })
  notes: string | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @ManyToOne(() => Facility, (f) => f.spaces)
  @JoinColumn({ name: 'facility_id' })
  facility: Facility;
}
