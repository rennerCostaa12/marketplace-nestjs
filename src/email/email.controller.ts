import { Controller, Post, Body } from '@nestjs/common';
import { EmailService } from './email.service';
import { RecoveryPasswordDto } from './dto/send-email.dto';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('recovery-password')
  async create(@Body() sendEmail: RecoveryPasswordDto) {
    await this.emailService.sendEmailRecoveryPassword(sendEmail);
  }
}
