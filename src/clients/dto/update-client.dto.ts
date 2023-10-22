import {
  IsString,
  IsEmail,
  MaxLength,
  MinLength,
  IsOptional,
} from 'class-validator';

export class UpdateClientDto {
  @IsString({ message: 'O campo username é do tipo string' })
  @MaxLength(150, {
    message: 'O campo username permite no máximo 150 caracteres',
  })
  @IsOptional()
  username: string | null;

  @IsEmail()
  @IsOptional()
  email: string | null;

  @IsString({ message: 'O campo password é do tipo string' })
  @MinLength(7, {
    message: 'O campo password precisa ter no mínimo 7 caracteres',
  })
  @IsOptional()
  password: string | null;

  @IsString({ message: 'O campo profile_img é do tipo string' })
  @IsOptional()
  profile_img: string | null;

  @IsString({ message: 'O campo address é do tipo string' })
  @IsOptional()
  address: string | null;

  @IsString({ message: 'O campo complement_address é do tipo string' })
  @IsOptional()
  complement_address: string | null;
}
