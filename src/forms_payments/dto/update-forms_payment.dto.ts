import { PartialType } from '@nestjs/mapped-types';
import { CreateFormsPaymentDto } from './create-forms_payment.dto';

export class UpdateFormsPaymentDto extends PartialType(CreateFormsPaymentDto) {}
