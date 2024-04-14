import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class RecoveryPasswordDto {
  @IsNotEmpty({ message: 'O campo Email do Usuário é obrigatório' })
  @IsString({ message: 'O campo Email do Usuário é do tipo string' })
  @IsEmail()
  email_user: string;
}
