import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index, ManyToOne, JoinColumn } from 'typeorm';
import { HttpMethod, RouteStatus } from '../../common/enums';
import { ApiProduct } from './api-product.entity';

@Entity('api_routes')
@Index('idx_api_routes_product_code', ['productId', 'code'], { unique: true })
export class ApiRoute {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'product_id', type: 'uuid' })
  productId: string;

  @Column({ type: 'varchar', length: 50 })
  code: string;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ type: 'varchar', length: 500 })
  path: string;

  @Column({ name: 'http_method', type: 'enum', enum: HttpMethod, default: HttpMethod.GET })
  httpMethod: HttpMethod;

  @Column({ name: 'upstream_url', type: 'varchar', length: 500 })
  upstreamUrl: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'enum', enum: RouteStatus, default: RouteStatus.ACTIVE })
  status: RouteStatus;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @ManyToOne(() => ApiProduct, (p) => p.routes)
  @JoinColumn({ name: 'product_id' })
  product: ApiProduct;
}
