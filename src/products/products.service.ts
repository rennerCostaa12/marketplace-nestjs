import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

import { Product } from './entities/product.entity';
import { CategoriesProduct } from 'src/categories_products/entities/categories_product.entity';
import { Admin } from 'src/admins/entities/admin.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import {
  paginate,
  IPaginationOptions,
  Pagination,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
    @InjectRepository(CategoriesProduct)
    private categoriesProductRepository: Repository<CategoriesProduct>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const { admin, categories } = createProductDto;

    const isExistsAdmin = await this.adminRepository.findOneBy({ id: admin });

    if (!isExistsAdmin) {
      throw new HttpException(
        'Administrador inexistente',
        HttpStatus.NOT_FOUND,
      );
    }

    const isExistsCategories = await this.categoriesProductRepository.findOneBy(
      { id: categories },
    );

    if (!isExistsCategories) {
      throw new HttpException('Categoria inexistente', HttpStatus.NOT_FOUND);
    }

    const product = this.productRepository.create(createProductDto);
    return this.productRepository.save(product);
  }

  async findAll(options: IPaginationOptions): Promise<Pagination<Product>> {
    const query = this.productRepository.createQueryBuilder('product');
    query.leftJoinAndSelect('product.categories', 'categories_product');
    query.orderBy('product.name', 'ASC');
    return paginate<Product>(query, options);
  }

  async findOne(id: string) {
    const product = await this.productRepository.findOneBy({ id });

    if (!product) {
      throw new HttpException('Produto não encontrado', HttpStatus.NOT_FOUND);
    }

    return product;
  }

  async findBySearch(options: IPaginationOptions, nameProduct: string) {
    const query = this.productRepository.createQueryBuilder('product');
    query.leftJoinAndSelect('product.categories', 'categories_product');
    query.where('product.name LIKE :name', { name: `%${nameProduct}%` });

    return paginate<Product>(query, options);
  }

  async findByCategory(options: IPaginationOptions, categoryId: number) {
    const query = this.productRepository.createQueryBuilder('product');
    query.leftJoinAndSelect('product.categories', 'categories_product');
    query.where('product.categoriesId = :categoriesId', {
      categoriesId: categoryId,
    });
    query.orderBy('product.name', 'ASC');

    return paginate<Product>(query, options);
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const { admin, categories } = updateProductDto;

    const isExistsProduct = await this.productRepository.findOneBy({ id });

    if (!isExistsProduct) {
      throw new HttpException('Produto não encontrado', HttpStatus.NOT_FOUND);
    }

    const isExistsAdmin = await this.adminRepository.findOneBy({ id: admin });

    if (!isExistsAdmin) {
      throw new HttpException(
        'Administrador inexistente',
        HttpStatus.NOT_FOUND,
      );
    }

    const isExistsCategories = await this.categoriesProductRepository.findOneBy(
      { id: categories },
    );

    if (!isExistsCategories) {
      throw new HttpException('Categoria inexistente', HttpStatus.NOT_FOUND);
    }

    return this.productRepository.update(id, {
      ...updateProductDto,
      updated_at: new Date(),
    });
  }

  async remove(id: string) {
    const isExistsProduct = await this.productRepository.findOneBy({ id });

    if (!isExistsProduct) {
      throw new HttpException('Produto não encontrado', HttpStatus.NOT_FOUND);
    }

    return this.productRepository.delete(id);
  }
}
