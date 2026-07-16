import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { PurchaseRequisition } from './purchase-requisition.entity';

@Entity('requisition_items')
export class RequisitionItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'requisition_id', type: 'uuid' })
  requisitionId: string;

  @Column({ type: 'varchar', length: 300 })
  description: string;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'varchar', length: 20, default: 'EACH' })
  unit: string;

  @Column({ name: 'estimated_unit_cost', type: 'decimal', precision: 12, scale: 2, nullable: true })
  estimatedUnitCost: number | null;

  @Column({ name: 'inventory_item_id', type: 'uuid', nullable: true })
  inventoryItemId: string | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @ManyToOne(() => PurchaseRequisition, (r) => r.items)
  @JoinColumn({ name: 'requisition_id' })
  requisition: PurchaseRequisition;
}
