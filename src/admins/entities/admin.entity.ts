import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';
import { CategoriesProduct } from 'src/categories_products/entities/categories_product.entity';
import { Product } from 'src/products/entities/product.entity';
import { StatusSale } from 'src/status_sales/entities/status_sale.entity';

@Entity({ name: 'admins' })
export class Admin {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 150 })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  profile_img: string | null;

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

  @OneToMany(
    () => CategoriesProduct,
    (categoriesproducts) => categoriesproducts.admin,
  )
  categories_products: CategoriesProduct[];

  @OneToMany(() => Product, (product) => product.admin)
  products: Product[];

  @OneToMany(() => StatusSale, (status_sale) => status_sale.admin)
  status_sales: StatusSale[];
}
