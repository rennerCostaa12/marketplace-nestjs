import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';
import { Sale } from 'src/sales/entities/sale.entity';

@Entity({ name: 'clients' })
export class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 150 })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  profile_img: string;

  @Column()
  address: string;

  @Column({ nullable: true })
  complement_address: string;

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
