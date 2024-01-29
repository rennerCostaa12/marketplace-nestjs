import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { CategoriesProductsService } from './categories_products.service';
import { CreateCategoriesProductDto } from './dto/create-categories_product.dto';
import { UpdateCategoriesProductDto } from './dto/update-categories_product.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';

@UseGuards(AuthGuard, RolesGuard)
@Controller('categories-products')
export class CategoriesProductsController {
  constructor(
    private readonly categoriesProductsService: CategoriesProductsService,
  ) {}

  @Post()
  create(@Body() createCategoriesProductDto: CreateCategoriesProductDto) {
    return this.categoriesProductsService.create(createCategoriesProductDto);
  }

  @Get()
  findAll() {
    return this.categoriesProductsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesProductsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoriesProductDto: UpdateCategoriesProductDto,
  ) {
    return this.categoriesProductsService.update(
      +id,
      updateCategoriesProductDto,
    );
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesProductsService.remove(+id);
  }
}
