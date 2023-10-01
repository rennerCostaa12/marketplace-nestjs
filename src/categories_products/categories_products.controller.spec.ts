import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesProductsController } from './categories_products.controller';
import { CategoriesProductsService } from './categories_products.service';

describe('CategoriesProductsController', () => {
  let controller: CategoriesProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesProductsController],
      providers: [CategoriesProductsService],
    }).compile();

    controller = module.get<CategoriesProductsController>(
      CategoriesProductsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
