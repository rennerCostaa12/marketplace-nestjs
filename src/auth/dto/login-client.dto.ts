import {
  IsString,
  MinLength,
  IsNotEmpty,
  IsArray,
  ArrayMinSize,
} from 'class-validator';

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

  @IsNotEmpty({
    message: 'O campo lista de códigos de dispositivos é obrigatório',
  })
  @IsArray({ message: 'O campo lista de códigos de dispositivos é uma array' })
  @IsString({
    each: true,
    message: 'O campo lista de códigos de dispositivos é uma string',
  })
  @ArrayMinSize(1, { message: 'Precisa ter pelo menos um valor na lista' })
  listDevicesToken: string[];
}
