import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { AssetStatus } from '../../common/enums';
import { AssetCategory } from './asset-category.entity';
import { AssetAssignment } from './asset-assignment.entity';

@Entity('assets')
@Index('idx_assets_number', ['assetNumber'], { unique: true })
@Index('idx_assets_status', ['status'])
@Index('idx_assets_unit', ['unitId'])
export class Asset {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'asset_number', type: 'varchar', length: 50, unique: true })
  assetNumber: string;

  @Column({ name: 'category_id', type: 'uuid' })
  categoryId: string;

  @Column({ type: 'varchar', length: 300 })
  name: string;

  @Column({ name: 'serial_number', type: 'varchar', length: 100, nullable: true })
  serialNumber: string | null;

  @Column({ type: 'enum', enum: AssetStatus, default: AssetStatus.REGISTERED })
  status: AssetStatus;

  @Column({ name: 'unit_id', type: 'uuid', nullable: true })
  unitId: string | null;

  @Column({ name: 'acquisition_date', type: 'date', nullable: true })
  acquisitionDate: string | null;

  @Column({ type: 'decimal', precision: 14, scale: 2, nullable: true })
  value: number | null;

  @Column({ type: 'text', nullable: true })
  notes: string | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @ManyToOne(() => AssetCategory, (c) => c.assets)
  @JoinColumn({ name: 'category_id' })
  category: AssetCategory;

  @OneToMany(() => AssetAssignment, (a) => a.asset)
  assignments: AssetAssignment[];
}
