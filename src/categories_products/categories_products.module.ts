import { Module } from '@nestjs/common';
import { CategoriesProductsService } from './categories_products.service';
import { CategoriesProductsController } from './categories_products.controller';
import { CategoriesProduct } from './entities/categories_product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from 'src/admins/entities/admin.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CategoriesProduct, Admin])],
  controllers: [CategoriesProductsController],
  providers: [CategoriesProductsService],
})
export class CategoriesProductsModule {}
