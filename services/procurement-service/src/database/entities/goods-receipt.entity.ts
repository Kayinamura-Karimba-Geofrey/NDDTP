import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index, ManyToOne, JoinColumn } from 'typeorm';
import { ReceiptStatus } from '../../common/enums';
import { PurchaseOrder } from './purchase-order.entity';

@Entity('goods_receipts')
@Index('idx_receipts_number', ['receiptNumber'], { unique: true })
export class GoodsReceipt {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'receipt_number', type: 'varchar', length: 50, unique: true })
  receiptNumber: string;

  @Column({ name: 'order_id', type: 'uuid' })
  orderId: string;

  @Column({ name: 'order_item_id', type: 'uuid' })
  orderItemId: string;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ name: 'received_by', type: 'uuid' })
  receivedBy: string;

  @Column({ name: 'warehouse_id', type: 'uuid', nullable: true })
  warehouseId: string | null;

  @Column({ type: 'enum', enum: ReceiptStatus, default: ReceiptStatus.COMPLETED })
  status: ReceiptStatus;

  @Column({ type: 'text', nullable: true })
  notes: string | null;

  @CreateDateColumn({ name: 'received_at', type: 'timestamptz' })
  receivedAt: Date;

  @ManyToOne(() => PurchaseOrder)
  @JoinColumn({ name: 'order_id' })
  order: PurchaseOrder;
}
