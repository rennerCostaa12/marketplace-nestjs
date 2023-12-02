import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from 'src/admins/entities/admin.entity';
import { Client } from 'src/clients/entities/client.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin, Client]),
    JwtModule.register({
      global: true,
      secret: 'VBqUX~23c{EW7g}XWxBKj&MKf#}wMbT',
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
