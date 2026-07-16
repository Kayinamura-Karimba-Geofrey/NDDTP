import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index } from 'typeorm';
import { MovementType } from '../../common/enums';

@Entity('asset_movements')
@Index('idx_asset_movements_asset', ['assetId'])
export class AssetMovement {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'asset_id', type: 'uuid' })
  assetId: string;

  @Column({ name: 'movement_type', type: 'enum', enum: MovementType })
  movementType: MovementType;

  @Column({ name: 'from_unit_id', type: 'uuid', nullable: true })
  fromUnitId: string | null;

  @Column({ name: 'to_unit_id', type: 'uuid', nullable: true })
  toUnitId: string | null;

  @Column({ name: 'from_user_id', type: 'uuid', nullable: true })
  fromUserId: string | null;

  @Column({ name: 'to_user_id', type: 'uuid', nullable: true })
  toUserId: string | null;

  @Column({ type: 'text', nullable: true })
  notes: string | null;

  @Column({ name: 'moved_by', type: 'uuid' })
  movedBy: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;
}
