import {
  IsNotEmpty,
  IsJSON,
  IsNumber,
  IsString,
  IsOptional,
} from 'class-validator';

export class CreateSaleDto {
  @IsString({ message: 'O campo cliente é do tipo string' })
  @IsNotEmpty({ message: 'O campo cliente é obrigatório' })
  client: any;

  @IsNumber()
  @IsNotEmpty({ message: 'O campo status é obrigatório' })
  status: any;

  @IsNumber()
  @IsNotEmpty({
    message: 'O campo forma de pagamentos é obrigatório',
  })
  payments: any;

  @IsNumber()
  @IsNotEmpty({
    message: 'O campo forma de entrega é obrigatório',
  })
  delivery: any;

  @IsNotEmpty({ message: 'O campo lista de produtos é obrigatório' })
  list_products: any[];

  @IsNumber()
  @IsNotEmpty({ message: 'O campo total é obrigatório' })
  total: number;

  @IsNumber()
  @IsOptional()
  change_money: number;

  @IsNumber()
  @IsOptional()
  installments: number;
}
