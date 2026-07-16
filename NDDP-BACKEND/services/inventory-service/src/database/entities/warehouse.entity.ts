import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index, OneToMany } from 'typeorm';
import { WarehouseStatus } from '../../common/enums';
import { StockLevel } from './stock-level.entity';

@Entity('warehouses')
@Index('idx_warehouses_code', ['code'], { unique: true })
export class Warehouse {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  code: string;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  location: string | null;

  @Column({ type: 'enum', enum: WarehouseStatus, default: WarehouseStatus.ACTIVE })
  status: WarehouseStatus;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @OneToMany(() => StockLevel, (s) => s.warehouse)
  stockLevels: StockLevel[];
}
