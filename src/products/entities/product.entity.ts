import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Admin } from 'src/admins/entities/admin.entity';
import { CategoriesProduct } from 'src/categories_products/entities/categories_product.entity';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 150 })
  name: string;

  @Column({ type: 'double precision' })
  price: number;

  @Column({ type: 'integer' })
  stock: number;

  @Column()
  img_product: string;

  @Column({ type: 'boolean' })
  unavailable: boolean;

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

  @ManyToOne(
    () => CategoriesProduct,
    (categoriesProduct) => categoriesProduct.products,
  )
  categories: CategoriesProduct;

  @ManyToOne(() => Admin, (admin) => admin.products)
  admin: Admin;
}
