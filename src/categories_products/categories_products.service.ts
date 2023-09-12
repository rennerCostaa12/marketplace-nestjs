import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateCategoriesProductDto } from './dto/create-categories_product.dto';
import { UpdateCategoriesProductDto } from './dto/update-categories_product.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriesProduct } from './entities/categories_product.entity';
import { Admin } from 'src/admins/entities/admin.entity';

@Injectable()
export class CategoriesProductsService {
  constructor(
    @InjectRepository(CategoriesProduct)
    private categoriesProductRepository: Repository<CategoriesProduct>,
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
  ) {}

  async create(createCategoriesProductDto: CreateCategoriesProductDto) {
    const { admin } = createCategoriesProductDto;

    const isExistsAdmin = await this.adminRepository.findOneBy({ id: admin });

    if (!isExistsAdmin) {
      throw new HttpException(
        'Administrador inexistente',
        HttpStatus.NOT_FOUND,
      );
    }

    const cat_product = this.categoriesProductRepository.create(
      createCategoriesProductDto,
    );

    return this.categoriesProductRepository.save(cat_product);
  }

  findAll() {
    return this.categoriesProductRepository.find();
  }

  async findOne(id: number) {
    const categoriesProduct = await this.categoriesProductRepository.findOneBy({
      id,
    });

    if (!categoriesProduct) {
      throw new HttpException(
        'Categoria de produto não encontrada',
        HttpStatus.NOT_FOUND,
      );
    }

    return this.categoriesProductRepository.findOneBy({ id });
  }

  async update(
    id: number,
    updateCategoriesProductDto: UpdateCategoriesProductDto,
  ) {
    const { admin } = updateCategoriesProductDto;

    const isExistsCategoriesProduct =
      await this.categoriesProductRepository.findOneBy({ id });

    if (!isExistsCategoriesProduct) {
      throw new HttpException(
        'Categoria de produto não encontrada',
        HttpStatus.NOT_FOUND,
      );
    }

    const isExistsAdmin = await this.adminRepository.findOneBy({ id: admin });

    if (!isExistsAdmin) {
      throw new HttpException(
        'Administrador inexistente',
        HttpStatus.NOT_FOUND,
      );
    }

    return this.categoriesProductRepository.update(id, {
      ...updateCategoriesProductDto,
      update_at: new Date(),
    });
  }

  async remove(id: number) {
    const isExistsCategoriesProduct =
      await this.categoriesProductRepository.findOneBy({ id });

    if (!isExistsCategoriesProduct) {
      throw new HttpException(
        'Categoria de produto não encontrada',
        HttpStatus.NOT_FOUND,
      );
    }

    return this.categoriesProductRepository.delete(id);
  }
}
