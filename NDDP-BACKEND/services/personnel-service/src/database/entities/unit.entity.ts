import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn,
  Index, ManyToOne, JoinColumn, OneToMany,
} from 'typeorm';
import { UnitType } from '../../common/enums';

@Entity('units')
@Index('idx_units_code', ['code'], { unique: true })
@Index('idx_units_parent', ['parentUnitId'])
export class Unit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  code: string;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ name: 'unit_type', type: 'enum', enum: UnitType })
  unitType: UnitType;

  @Column({ name: 'parent_unit_id', type: 'uuid', nullable: true })
  parentUnitId: string | null;

  @Column({ name: 'commander_personnel_id', type: 'uuid', nullable: true })
  commanderPersonnelId: string | null;

  @Column({ type: 'varchar', length: 200, nullable: true })
  location: string | null;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @ManyToOne(() => Unit, (u) => u.children, { nullable: true })
  @JoinColumn({ name: 'parent_unit_id' })
  parentUnit: Unit | null;

  @OneToMany(() => Unit, (u) => u.parentUnit)
  children: Unit[];
}
