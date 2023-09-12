import {
  IsNotEmpty,
  IsJSON,
  IsNumber,
  IsBoolean,
  IsString,
} from 'class-validator';

export class CreateSaleDto {
  @IsString({ message: 'O campo client é do tipo string' })
  @IsNotEmpty({ message: 'O campo client não pode ser vazio' })
  client: any;

  @IsNumber()
  @IsNotEmpty({ message: 'O campo status não pode ser vazio' })
  status: any;

  @IsJSON({ message: 'O campo list_products é do tipo de json' })
  @IsNotEmpty({ message: 'O campo list_products não pode ser vazio' })
  list_products: any;

  @IsBoolean({ message: 'O campo sold é do tipo boolean' })
  @IsNotEmpty({ message: 'O campo sold não pode ser vazio' })
  sold: boolean;

  @IsNumber()
  @IsNotEmpty({ message: 'O campo total não pode ser vazio' })
  total: number;
}
