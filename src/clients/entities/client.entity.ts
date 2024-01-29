import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';
import { Sale } from 'src/sales/entities/sale.entity';

@Entity({ name: 'clients' })
export class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 150 })
  username: string;

  @Column({ unique: true, nullable: true })
  email: string;

  @Column({ unique: true })
  phone: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  profile_img: string;

  @Column()
  address: string;

  @Column()
  number_address: number;

  @Column({ nullable: true })
  complement_address: string;

  @Column({ array: true, type: 'text', default: [] })
  listDevicesToken: string[];

  @OneToMany(() => Sale, (sale) => sale.client)
  shopping: Sale[];

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
