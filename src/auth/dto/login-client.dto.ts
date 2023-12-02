import { IsString, MinLength, IsNotEmpty } from 'class-validator';

export class LoginClientDto {
  @IsString({ message: 'O campo telefone é do tipo string' })
  @IsNotEmpty({ message: 'O campo telefone é obrigatório' })
  phone: string;

  @IsString({ message: 'O campo senha é do tipo string' })
  @IsNotEmpty({ message: 'O campo senha é obrigatório' })
  @MinLength(7, {
    message: 'O campo senha precisa ter no mínimo 7 caracteres',
  })
  password: string;
}
