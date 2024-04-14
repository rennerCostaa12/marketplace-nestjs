import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailerConfig } from 'src/configs/mailer-module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from 'src/admins/entities/admin.entity';

@Module({
  controllers: [EmailController],
  providers: [EmailService],
  imports: [
    MailerModule.forRoot(MailerConfig),
    TypeOrmModule.forFeature([Admin]),
  ],
  exports: [MailerModule],
})
export class EmailModule {}
