import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCategoriesProductDto {
  @IsString({ message: 'Este campo é do tipo string' })
  @IsNotEmpty({ message: 'O campo name é obrigatório' })
  name: string;

  @IsNotEmpty({ message: 'O campo admin é obrigatório' })
  admin: any;
}
