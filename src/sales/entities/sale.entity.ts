import { PrimaryGeneratedColumn, Column, Entity, ManyToOne } from 'typeorm';
import { Client } from 'src/clients/entities/client.entity';
import { StatusSale } from 'src/status_sales/entities/status_sale.entity';
import { FormsPayment } from 'src/forms_payments/entities/forms_payment.entity';
import { FormDelivery } from 'src/form_delivery/entities/form_delivery.entity';

@Entity({ name: 'sales' })
export class Sale {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Client, (client) => client.shopping)
  client: Client;

  @ManyToOne(() => StatusSale, (status_sales) => status_sales.status)
  status: StatusSale;

  @ManyToOne(() => FormsPayment, (forms_payment) => forms_payment.sales)
  payments: FormsPayment;

  @ManyToOne(() => FormDelivery, (form_delivery) => form_delivery.sales)
  delivery: FormDelivery;

  @Column({ type: 'double precision', nullable: true })
  change_money: number;

  @Column({ nullable: true })
  installments: number;

  @Column({ type: 'json' })
  list_products: any;

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
