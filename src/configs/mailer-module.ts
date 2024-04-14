import { MailerOptions } from '@nestjs-modules/mailer';

export const MailerConfig: MailerOptions = {
  transport: {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'ozielrennerc.rodrigues@gmail.com',
      pass: 'rkxwrqpeldvygibr',
    },
  },
  defaults: {
    from: '"No reply" <no-reply@localhost>',
  },
};
