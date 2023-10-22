import {
  IsString,
  IsNotEmpty,
  IsEmail,
  MaxLength,
  MinLength,
  IsOptional,
} from 'class-validator';

export class CreateClientDto {
  @IsString({ message: 'O campo username é do tipo string' })
  @IsNotEmpty({ message: 'O campo username é obrigatório' })
  @MaxLength(150, {
    message: 'O campo username permite no máximo 150 caracteres',
  })
  username: string;

  @IsEmail()
  @IsNotEmpty({ message: 'O campo email é obrigatório' })
  email: string;

  @IsString({ message: 'O campo password é do tipo string' })
  @IsNotEmpty({ message: 'O campo password é obrigatório' })
  @MinLength(7, {
    message: 'O campo password precisa ter no mínimo 7 caracteres',
  })
  password: string;

  @IsString({ message: 'O campo profile_img é do tipo string' })
  @IsOptional()
  profile_img: string;

  @IsString({ message: 'O campo address é do tipo string' })
  @IsNotEmpty({ message: 'O campo address é obrigatório' })
  address: string;

  @IsString({ message: 'O campo complement_address é do tipo string' })
  @IsOptional()
  complement_address: string | null;
}
