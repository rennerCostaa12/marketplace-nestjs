import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sale } from './entities/sale.entity';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sale)
    private salesRepository: Repository<Sale>,
  ) {}

  async create(createSaleDto: CreateSaleDto) {
    const { payments, change_money } = createSaleDto;

    if (payments === 1 && change_money === null) {
      throw new HttpException(
        'O valor do troco não pode ser nulo',
        HttpStatus.BAD_REQUEST,
      );
    }

    const sale = this.salesRepository.create(createSaleDto);
    return this.salesRepository.save(sale);
  }

  findAll() {
    return this.salesRepository.find();
  }

  findOne(id: string) {
    return this.salesRepository.findOneBy({ id });
  }

  update(id: string, updateSaleDto: UpdateSaleDto) {
    const isExistsSales = this.salesRepository.findOneBy({ id });

    if (!isExistsSales) {
      throw new HttpException(
        'Este registro de venda não foi encontrado',
        HttpStatus.NOT_FOUND,
      );
    }

    return this.salesRepository.update(id, {
      ...updateSaleDto,
      updated_at: new Date(),
    });
  }

  remove(id: string) {
    return this.salesRepository.delete(id);
  }
}
