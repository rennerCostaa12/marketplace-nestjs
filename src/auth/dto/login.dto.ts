import { IsString, IsEmail, MinLength, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString({ message: 'O campo password é do tipo string' })
  @IsNotEmpty({ message: 'O campo password não pode ser nulo' })
  @MinLength(7, {
    message: 'O campo password precisa ter no mínimo 7 caracteres',
  })
  password: string;
}
