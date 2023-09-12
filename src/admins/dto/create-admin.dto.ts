import {
  IsString,
  IsEmail,
  IsNotEmpty,
  MaxLength,
  MinLength,
  IsOptional,
} from 'class-validator';

export class CreateAdminDto {
  @IsString({ message: 'O campo username é do tipo string' })
  @IsNotEmpty({ message: 'O campo username não pode ser nulo' })
  @MaxLength(150, {
    message: 'O campo username permite no máximo 150 caracteres',
  })
  username: string;

  @IsEmail()
  @IsNotEmpty({ message: 'O campo email não pode ser nulo' })
  email: string;

  @IsString({ message: 'O campo password é do tipo string' })
  @IsNotEmpty({ message: 'O campo password não pode ser nulo' })
  @MinLength(7, {
    message: 'O campo password precisa ter no mínimo 7 caracteres',
  })
  password: string;

  @IsString({ message: 'O campo profile_img campo é do tipo string' })
  @IsOptional()
  profile_img: string | null;
}
