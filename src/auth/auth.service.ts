import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { CreateAdminDto } from 'src/admins/dto/create-admin.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from 'src/admins/entities/admin.entity';
import { Client } from 'src/clients/entities/client.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Admin)
    private adminService: Repository<Admin>,
    @InjectRepository(Client)
    private clientService: Repository<Client>,
    private jwtService: JwtService,
  ) {}

  async comparePassword(password: string, hash: string) {
    const isMatchPasswords = await bcrypt.compare(password, hash);
    return isMatchPasswords;
  }

  async signInAdmin(loginData: LoginDto): Promise<any> {
    const { email, password } = loginData;

    const admin = await this.adminService.findOneBy({ email });

    if (!admin) {
      throw new HttpException('Email/Senha inválida!', HttpStatus.UNAUTHORIZED);
    }

    if (!(await this.comparePassword(password, admin.password))) {
      throw new HttpException('Email/Senha inválida!', HttpStatus.UNAUTHORIZED);
    }

    const payload = {
      id: admin.id,
      username: admin.username,
      email: admin.email,
    };

    return {
      access_token: await this.jwtService.signAsync(payload, {
        expiresIn: '7 days',
        subject: String(admin.id),
        audience: 'admin',
      }),
    };
  }

  async signInClient(loginData: LoginDto): Promise<any> {
    const { email, password } = loginData;

    const client = await this.clientService.findOneBy({ email });

    if (!client) {
      throw new HttpException('Email/Senha inválida!', HttpStatus.UNAUTHORIZED);
    }

    if (!(await this.comparePassword(password, client.password))) {
      throw new HttpException('Email/Senha inválida!', HttpStatus.UNAUTHORIZED);
    }

    const payload = {
      id: client.id,
      username: client.username,
      email: client.email,
    };

    return {
      access_token: await this.jwtService.signAsync(payload, {
        expiresIn: '7 days',
        subject: String(client.id),
        audience: 'client',
      }),
    };
  }

  registerAdmin(datasAdmin: CreateAdminDto) {
    const admin = this.adminService.create(datasAdmin);

    const payload = {
      id: admin.id,
      username: admin.username,
      email: admin.email,
    };

    return this.jwtService.signAsync(payload, {
      expiresIn: '7 days',
      subject: String(admin.id),
      audience: 'admin',
    });
  }
  SECRET_AUTH;
  checkToken(token: string) {
    const datas = this.jwtService.verifyAsync(token, {
      audience: 'admin',
      secret: process.env.SECRET_AUTH,
    });

    return datas;
  }
}
