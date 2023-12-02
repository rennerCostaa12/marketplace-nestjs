import { IsString, IsNotEmpty } from 'class-validator';

export class CreateFormDeliveryDto {
  @IsNotEmpty({ message: 'Campo nome é obrigatório' })
  @IsString({
    message: 'Nome é do tipo string',
  })
  name: string;
}
