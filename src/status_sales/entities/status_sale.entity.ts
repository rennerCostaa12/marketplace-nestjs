import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Admin } from 'src/admins/entities/admin.entity';
import { Sale } from 'src/sales/entities/sale.entity';

@Entity({ name: 'status_sales' })
export class StatusSale {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @ManyToOne(() => Admin, (admin) => admin.status_sales)
  admin: Admin;

  @OneToMany(() => Sale, (sale) => sale.status)
  status: Sale[];

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
