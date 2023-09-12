import { PrimaryGeneratedColumn, Column, Entity, ManyToOne } from 'typeorm';
import { Client } from 'src/clients/entities/client.entity';
import { StatusSale } from 'src/status_sales/entities/status_sale.entity';

@Entity({ name: 'sales' })
export class Sale {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Client, (client) => client.shopping)
  client: Client;

  @ManyToOne(() => StatusSale, (status_sales) => status_sales.status)
  status: StatusSale;

  @Column({ type: 'json' })
  list_products: any;

  @Column({ type: 'boolean' })
  sold: boolean;

  @Column({ type: 'double precision' })
  total: number;

  @Column({
    type: 'timestamp without time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  @Column({
    type: 'timestamp without time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;
}
