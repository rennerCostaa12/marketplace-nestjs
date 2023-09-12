import { IsString, IsNotEmpty } from 'class-validator';

export class CreateStatusSaleDto {
  @IsString({ message: 'O campo name é do tipo string' })
  @IsNotEmpty({ message: 'O campo name é obrigatório' })
  name: string;

  @IsString({ message: 'O campo admin é do tipo string' })
  @IsNotEmpty({ message: 'O campo admin é obrigatório' })
  admin: any;
}
