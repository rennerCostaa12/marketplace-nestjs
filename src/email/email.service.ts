import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RecoveryPasswordDto } from './dto/send-email.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { Admin } from 'src/admins/entities/admin.entity';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class EmailService {
  constructor(
    private mailerService: MailerService,
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
  ) {}

  async sendEmailRecoveryPassword(recoveryPasswordDto: RecoveryPasswordDto) {
    const userFind = await this.adminRepository.findOneBy({
      email: recoveryPasswordDto.email_user,
    });

    if (!userFind) {
      throw new HttpException('Admin não encontrado', HttpStatus.NOT_FOUND);
    }

    const user = {
      username: userFind.username,
      email: userFind.email,
      id: userFind.id,
    };

    const token = jwt.sign(user, process.env.SECRET_AUTH, {
      expiresIn: '1h',
    });

    await this.mailerService.sendMail({
      to: userFind.email,
      from: process.env.MAIL_FROM_EMAIL_DEFAULT,
      subject: `Recuperação de senha da plataforma admin: ${process.env.NAME_APPLICATION}`,
      html: `
          <h1>Olá ${user.username}</h1>

          <p>Para redefinir sua senha clique no link abaixo:</p>

          <div>
            <a href="${`${process.env.URL_ADMIN_APPLICATION}?token=${token}`}">${`${process.env.URL_ADMIN_APPLICATION}?token=${token}`}</a>
          </div>
        `,
    });

    return {
      status: true,
      message: 'Email enviado com sucesso!',
    };
  }

  // async verifyToken(token: { token: string }) {
  //   const resultToken = jwt.verify(token.token, process.env.SECRET_AUTH);

  //   if (resultToken) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }
}
