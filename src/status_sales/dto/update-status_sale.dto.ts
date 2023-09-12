import { PartialType } from '@nestjs/mapped-types';
import { CreateStatusSaleDto } from './create-status_sale.dto';

export class UpdateStatusSaleDto extends PartialType(CreateStatusSaleDto) {}
