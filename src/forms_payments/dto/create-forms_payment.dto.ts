import { IsString, IsNotEmpty } from 'class-validator';

export class CreateFormsPaymentDto {
  @IsString({ message: 'Campo nome é do tipo string' })
  @IsNotEmpty({ message: 'Campo nome não pode ser vazio' })
  name: string;

  @IsString({ message: 'O campo tipo é uma string' })
  @IsNotEmpty({ message: 'O campo tipo não pode ser vazio' })
  type: string;
}
