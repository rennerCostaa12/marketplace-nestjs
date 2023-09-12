import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateStatusSaleDto } from './dto/create-status_sale.dto';
import { UpdateStatusSaleDto } from './dto/update-status_sale.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StatusSale } from './entities/status_sale.entity';
import { Admin } from 'src/admins/entities/admin.entity';

@Injectable()
export class StatusSalesService {
  constructor(
    @InjectRepository(StatusSale)
    private statusSaleRepository: Repository<StatusSale>,
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
  ) {}

  async create(createStatusSaleDto: CreateStatusSaleDto) {
    const { admin } = createStatusSaleDto;

    const isExistsAdmin = await this.adminRepository.findOneBy({ id: admin });

    if (!isExistsAdmin) {
      throw new HttpException('Admin inexistente', HttpStatus.NOT_FOUND);
    }

    const statusSale = this.statusSaleRepository.create(createStatusSaleDto);

    return this.statusSaleRepository.save(statusSale);
  }

  findAll() {
    return this.statusSaleRepository.find();
  }

  async findOne(id: number) {
    const statusSales = await this.statusSaleRepository.findOneBy({ id });

    if (!statusSales) {
      throw new HttpException(
        'Status de venda não encontrado',
        HttpStatus.NOT_FOUND,
      );
    }

    return statusSales;
  }

  async update(id: number, updateStatusSaleDto: UpdateStatusSaleDto) {
    const { admin } = updateStatusSaleDto;

    const isExistsSatusSales = await this.statusSaleRepository.findOneBy({
      id,
    });

    if (!isExistsSatusSales) {
      throw new HttpException(
        'Status de venda não encontrado',
        HttpStatus.NOT_FOUND,
      );
    }

    const isExistsAdmin = await this.adminRepository.findOneBy({ id: admin });

    if (!isExistsAdmin) {
      throw new HttpException('Admin inexistente', HttpStatus.NOT_FOUND);
    }

    return this.statusSaleRepository.update(id, {
      ...updateStatusSaleDto,
      updated_at: new Date(),
    });
  }

  async remove(id: number) {
    const isExistsSatusSales = await this.statusSaleRepository.findOneBy({
      id,
    });

    if (!isExistsSatusSales) {
      throw new HttpException(
        'Status de venda não encontrado',
        HttpStatus.NOT_FOUND,
      );
    }

    return this.statusSaleRepository.delete(id);
  }
}
