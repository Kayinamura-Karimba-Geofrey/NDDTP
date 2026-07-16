import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index } from 'typeorm';
import { StockMovementType } from '../../common/enums';

@Entity('stock_movements')
@Index('idx_stock_movements_warehouse', ['warehouseId'])
@Index('idx_stock_movements_item', ['itemId'])
export class StockMovement {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'warehouse_id', type: 'uuid' })
  warehouseId: string;

  @Column({ name: 'item_id', type: 'uuid' })
  itemId: string;

  @Column({ name: 'movement_type', type: 'enum', enum: StockMovementType })
  movementType: StockMovementType;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ name: 'reference_number', type: 'varchar', length: 50, nullable: true })
  referenceNumber: string | null;

  @Column({ type: 'text', nullable: true })
  notes: string | null;

  @Column({ name: 'performed_by', type: 'uuid' })
  performedBy: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;
}
