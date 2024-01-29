import { IsString, IsNotEmpty } from 'class-validator';

export class SignOutClientDto {
  @IsNotEmpty({ message: 'Campo código do dispositivo não poder ser vazio' })
  @IsString({ message: 'Campo código do dispositivo é do tipo string' })
  tokenDevice: string;

  @IsNotEmpty({ message: 'Campo telefone não poder ser vazio' })
  @IsString({ message: 'Campo telefone é do tipo string' })
  phone: string;
}
