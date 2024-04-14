import { IsString, MinLength, IsNotEmpty } from 'class-validator';

export class ChangePasswordAdminDto {
  @IsNotEmpty({ message: 'O campo senha é obrigatório.' })
  @MinLength(7, {
    message: 'O campo senha precisa ter no mínimo 7 caracteres.',
  })
  @IsString({ message: 'O campo confirmação de senha é do tipo string.' })
  password: string;

  @IsNotEmpty({ message: 'O campo confirmação de senha é obrigatório.' })
  @MinLength(7, {
    message: 'O campo confirmação de senha precisa ter no mínimo 7 caracteres.',
  })
  @IsString({ message: 'O campo confirmação de senha é do tipo string.' })
  confirm_password: string;

  @IsNotEmpty({ message: 'O campo token é obrigatório.' })
  @IsString({ message: 'O campo token é do tipo string.' })
  token: string;
}
