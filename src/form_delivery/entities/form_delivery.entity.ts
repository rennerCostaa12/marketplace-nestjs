import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';
import { Sale } from 'src/sales/entities/sale.entity';

@Entity({ name: 'form_delivery' })
export class FormDelivery {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Sale, (sale) => sale.delivery)
  sales: Sale[];

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
