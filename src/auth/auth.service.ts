import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { CreateAdminDto } from 'src/admins/dto/create-admin.dto';
import { LoginClientDto } from './dto/login-client.dto';
import { SignOutClientDto } from './dto/signout-client.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from 'src/admins/entities/admin.entity';
import { Client } from 'src/clients/entities/client.entity';
import { Repository } from 'typeorm';

import { jwtConstants } from './constants';

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
      profile_img: admin.profile_img,
    };

    return {
      access_token: await this.jwtService.signAsync(payload, {
        expiresIn: '7 days',
        subject: String(admin.id),
        audience: 'admin',
      }),
      user: payload,
    };
  }

  async signInClient(loginData: LoginClientDto): Promise<any> {
    const { phone, password, listDevicesToken } = loginData;

    const client = await this.clientService.findOneBy({ phone });

    if (!client) {
      throw new HttpException(
        'Telefone/Senha inválida!',
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (!(await this.comparePassword(password, client.password))) {
      throw new HttpException(
        'Telefone/Senha inválida!',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const newListDevicesToken = [
      ...client.listDevicesToken,
      listDevicesToken[0],
    ];

    client.listDevicesToken = newListDevicesToken;

    const userCreated = await this.clientService.create(client);

    await this.clientService.save(userCreated);

    const payload = {
      id: client.id,
      username: client.username,
      phone: client.phone,
      profile_img: client.profile_img,
      address: client.address,
      complement_address: client.complement_address,
      number_address: client.number_address,
      email: client.email
    };

    const objectUser = {
      access_token: await this.jwtService.signAsync(payload, {
        expiresIn: '7 days',
        subject: String(client.id),
        audience: 'client',
      }),
      user: payload,
    };

    return objectUser;
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

  checkToken(token: string) {
    const datas = this.jwtService.verifyAsync(token, {
      audience: 'admin',
      secret: jwtConstants.secret,
    });

    return datas;
  }

  async signOut(client: SignOutClientDto) {
    const { phone, tokenDevice } = client;

    const clientFinded = await this.clientService.findOneBy({ phone });

    const isTokenFinded = clientFinded.listDevicesToken.includes(tokenDevice);

    if (isTokenFinded) {
      const newListTokenDevices = clientFinded.listDevicesToken.filter(
        (token) => token !== tokenDevice,
      );

      clientFinded.listDevicesToken = newListTokenDevices;

      const objectUser = await this.clientService.create(clientFinded);

      return await this.clientService.save(objectUser);
    }
  }
}
