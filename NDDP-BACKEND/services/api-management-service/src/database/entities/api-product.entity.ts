import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index, OneToMany } from 'typeorm';
import { ApiProtocol, ProductStatus } from '../../common/enums';
import { ApiRoute } from './api-route.entity';

@Entity('api_products')
@Index('idx_api_products_code', ['code'], { unique: true })
export class ApiProduct {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  code: string;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ type: 'varchar', length: 20, default: 'v1' })
  version: string;

  @Column({ name: 'base_path', type: 'varchar', length: 200 })
  basePath: string;

  @Column({ type: 'enum', enum: ApiProtocol, default: ApiProtocol.REST })
  protocol: ApiProtocol;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'enum', enum: ProductStatus, default: ProductStatus.ACTIVE })
  status: ProductStatus;

  @OneToMany(() => ApiRoute, (r) => r.product)
  routes: ApiRoute[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
