import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index, OneToMany } from 'typeorm';
import { ItemCategory, UnitOfMeasure } from '../../common/enums';
import { StockLevel } from './stock-level.entity';

@Entity('inventory_items')
@Index('idx_inventory_items_sku', ['sku'], { unique: true })
export class InventoryItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  sku: string;

  @Column({ type: 'varchar', length: 300 })
  name: string;

  @Column({ type: 'enum', enum: ItemCategory })
  category: ItemCategory;

  @Column({ type: 'enum', enum: UnitOfMeasure, default: UnitOfMeasure.EACH })
  unit: UnitOfMeasure;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ name: 'reorder_level', type: 'int', default: 0 })
  reorderLevel: number;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @OneToMany(() => StockLevel, (s) => s.item)
  stockLevels: StockLevel[];
}
