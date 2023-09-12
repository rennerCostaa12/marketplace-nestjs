import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Admin } from 'src/admins/entities/admin.entity';
import { Product } from 'src/products/entities/product.entity';

@Entity({ name: 'categories_product' })
export class CategoriesProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150, unique: true })
  name: string;

  @Column({
    type: 'timestamp without time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  @Column({
    type: 'timestamp without time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  update_at: Date;

  @ManyToOne(() => Admin, (admin) => admin.categories_products)
  admin: Admin;

  @OneToMany(() => Product, (product) => product.categories)
  products: Product;
}
