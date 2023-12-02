import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateFormsPaymentDto } from './dto/create-forms_payment.dto';
import { UpdateFormsPaymentDto } from './dto/update-forms_payment.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { FormsPayment } from './entities/forms_payment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FormsPaymentsService {
  constructor(
    @InjectRepository(FormsPayment)
    private formsPaymentsRepository: Repository<FormsPayment>,
  ) {}

  create(createFormsPaymentDto: CreateFormsPaymentDto) {
    const formsPayments = this.formsPaymentsRepository.create(
      createFormsPaymentDto,
    );
    return this.formsPaymentsRepository.save(formsPayments);
  }

  findAll() {
    const allFormsPayments = this.formsPaymentsRepository.find();
    return allFormsPayments;
  }

  async findOne(id: number) {
    const formPaymentFinded = await this.formsPaymentsRepository.findOneBy({
      id,
    });

    if (!formPaymentFinded) {
      throw new HttpException(
        'Não foi encontrado nenhum forma de pagamento com este identificador',
        HttpStatus.NOT_FOUND,
      );
    }

    return formPaymentFinded;
  }

  async update(id: number, updateFormsPaymentDto: UpdateFormsPaymentDto) {
    const formPaymentFinded = await this.formsPaymentsRepository.findOneBy({
      id,
    });

    if (!formPaymentFinded) {
      throw new HttpException(
        'Não foi encontrado nenhum forma de pagamento com este identificador',
        HttpStatus.NOT_FOUND,
      );
    }

    return this.formsPaymentsRepository.update(id, {
      ...updateFormsPaymentDto,
      updated_at: new Date(),
    });
  }

  async remove(id: number) {
    const formPaymentFinded = await this.formsPaymentsRepository.findOneBy({
      id,
    });

    if (!formPaymentFinded) {
      throw new HttpException(
        'Não foi encontrado nenhum forma de pagamento com este identificador',
        HttpStatus.NOT_FOUND,
      );
    }

    return this.formsPaymentsRepository.delete(id);
  }
}
