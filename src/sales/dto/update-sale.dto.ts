import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateSaleDto {
  @IsString({ message: 'O campo cliente é do tipo string' })
  @IsOptional()
  client: any;

  @IsNumber()
  @IsOptional()
  status: any;

  @IsNumber()
  @IsOptional()
  payments: any;

  @IsNumber()
  @IsOptional()
  delivery: any;

  @IsOptional()
  list_products: any[];

  @IsNumber()
  @IsOptional()
  total: number;

  @IsNumber()
  @IsOptional()
  change_money: number;

  @IsNumber()
  @IsOptional()
  installments: number;
}
