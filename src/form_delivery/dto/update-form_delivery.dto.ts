import { PartialType } from '@nestjs/mapped-types';
import { CreateFormDeliveryDto } from './create-form_delivery.dto';

export class UpdateFormDeliveryDto extends PartialType(CreateFormDeliveryDto) {}
