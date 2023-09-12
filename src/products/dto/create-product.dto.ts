import {
  IsString,
  IsNumber,
  IsBoolean,
  IsNotEmpty,
  MaxLength,
} from 'class-validator';

export class CreateProductDto {
  @IsString({ message: 'O campo name é do tipo string' })
  @MaxLength(150, {
    message: 'O campo name permite no máximo 150 caracteres',
  })
  @IsNotEmpty({ message: 'O campo name é obrigatório' })
  name: string;

  @IsNumber()
  @IsNotEmpty({ message: 'O campo price é obrigatório' })
  price: number;

  @IsNumber()
  @IsNotEmpty({ message: 'O campo stock é obrigatório' })
  stock: number;

  @IsString({ message: 'O campo img_product é do tipo string' })
  @IsNotEmpty({ message: 'O campo img_product é obrigatório' })
  img_product: string;

  @IsBoolean({ message: 'O campo unavailable é do tipo booleano' })
  @IsNotEmpty({ message: 'O campo unavailable é obrigatório' })
  unavailable: boolean;

  @IsNumber()
  @IsNotEmpty({ message: 'O campo categories é obrigatório' })
  categories: any;

  @IsString({ message: 'O campo admin é do tipo string' })
  @IsNotEmpty({ message: 'O campo admin é obrigatório' })
  admin: any;
}
