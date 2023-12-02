import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateFormDeliveryDto } from './dto/create-form_delivery.dto';
import { UpdateFormDeliveryDto } from './dto/update-form_delivery.dto';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FormDelivery } from './entities/form_delivery.entity';

@Injectable()
export class FormDeliveryService {
  constructor(
    @InjectRepository(FormDelivery)
    private repositoryFormDelivery: Repository<FormDelivery>,
  ) {}

  create(createFormDeliveryDto: CreateFormDeliveryDto) {
    const FormDelivery = this.repositoryFormDelivery.create(
      createFormDeliveryDto,
    );

    return this.repositoryFormDelivery.save(FormDelivery);
  }

  findAll() {
    return this.repositoryFormDelivery.find();
  }

  async findOne(id: number) {
    const formDeliveryFinded = await this.repositoryFormDelivery.findOneBy({
      id,
    });

    if (!formDeliveryFinded) {
      throw new HttpException(
        'Form de entrega não encontrada',
        HttpStatus.NOT_FOUND,
      );
    }

    return formDeliveryFinded;
  }

  async update(id: number, updateFormDeliveryDto: UpdateFormDeliveryDto) {
    const formDeliveryFinded = await this.repositoryFormDelivery.findOneBy({
      id,
    });

    if (!formDeliveryFinded) {
      throw new HttpException(
        'Form de entrega não encontrada',
        HttpStatus.NOT_FOUND,
      );
    }

    return this.repositoryFormDelivery.update(id, {
      ...updateFormDeliveryDto,
      updated_at: new Date(),
    });
  }
}
