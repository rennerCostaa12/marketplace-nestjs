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

  async findByClient(uuid: string) {
    const query = this.salesRepository.createQueryBuilder('sales');
    query.where('sales.clientId = :clientId', {
      clientId: uuid,
    });
    query.leftJoinAndSelect('sales.status', 'status');

    return query.execute();
  }

  findOne(id: string) {
    const isExistsSales = this.salesRepository.findOneBy({ id });

    if (!isExistsSales) {
      throw new HttpException(
        'Este registro de venda não foi encontrado',
        HttpStatus.NOT_FOUND,
      );
    }

    const querySales = this.salesRepository.createQueryBuilder('sales');
    querySales
      .where('sales.id = :id', {
        id,
      })
      .getOne();
    querySales.innerJoinAndSelect('sales.status', 'status');
    querySales.innerJoinAndSelect('sales.delivery', 'delivery');
    querySales.innerJoinAndSelect('sales.payments', 'payments');

    return querySales.execute();
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
