import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sale } from './entities/sale.entity';

import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';

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

  findAllFilter(
    options: IPaginationOptions,
    client_id: string,
    status_sales: string,
  ): Promise<Pagination<Sale>> {
    if (client_id.length <= 0 && status_sales.length <= 0) {
      throw new HttpException(
        'O código e status da venda não pode ser vazios',
        HttpStatus.BAD_REQUEST,
      );
    }

    const query = this.salesRepository.createQueryBuilder('sales');
    query.leftJoin('sales.status', 'status').addSelect(['status.name']);
    query
      .leftJoin('sales.client', 'client')
      .addSelect(['client.username', 'client.id', 'client.listDevicesToken']);
    query.leftJoin('sales.delivery', 'delivery').addSelect(['delivery.name']);
    query.orderBy('sales.created_at', 'DESC');

    if (client_id) {
      query.andWhere('client.id = :id', { id: client_id });
    }

    if (status_sales) {
      query.andWhere('status.name = :name', { name: status_sales });
    }

    query.getMany();

    return paginate(query, options);
  }

  findAllWithPagination(
    options: IPaginationOptions,
  ): Promise<Pagination<Sale>> {
    const query = this.salesRepository.createQueryBuilder('sales');
    query.leftJoin('sales.status', 'status').addSelect(['status.name']);
    query
      .leftJoin('sales.client', 'client')
      .addSelect([
        'client.username',
        'client.id',
        'client.listDevicesToken',
        'client.complement_address',
        'client.number_address',
        'client.address',
      ]);
    query.leftJoin('sales.delivery', 'delivery').addSelect(['delivery.name']);
    query.orderBy('sales.created_at', 'DESC');

    return paginate(query, options);
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
