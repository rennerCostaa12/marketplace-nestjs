import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from './entities/product.entity';
import { Admin } from 'src/admins/entities/admin.entity';
import { CategoriesProduct } from 'src/categories_products/entities/categories_product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Admin, CategoriesProduct])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
