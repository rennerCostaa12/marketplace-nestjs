import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './entities/admin.entity';

import {
  Pagination,
  IPaginationOptions,
  paginate,
} from 'nestjs-typeorm-paginate';
import { ChangePasswordAdminDto } from './dto/change-password-admin.dto';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AdminsService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
  ) {}

  async create(createAdminDto: CreateAdminDto) {
    const salt = await bcrypt.genSalt();

    createAdminDto.password = await bcrypt.hash(createAdminDto.password, salt);

    const admin = this.adminRepository.create(createAdminDto);
    return this.adminRepository.save(admin);
  }

  async findAll(options: IPaginationOptions): Promise<Pagination<Admin>> {
    const query = this.adminRepository.createQueryBuilder('admin');
    query.orderBy('admin.username', 'ASC');

    return paginate(query, options);
  }

  async findOne(id: string) {
    const admin = await this.adminRepository.findOneBy({ id });

    if (!admin) {
      throw new HttpException('Admin não encontrado', HttpStatus.NOT_FOUND);
    }

    return admin;
  }

  async update(id: string, updateAdminDto: UpdateAdminDto) {
    const adminExists = await this.adminRepository.findOneBy({ id });

    if (!adminExists) {
      throw new HttpException('admin não encontrado', HttpStatus.NOT_FOUND);
    }

    const salt = await bcrypt.genSalt();

    updateAdminDto.password = await bcrypt.hash(updateAdminDto.password, salt);

    return this.adminRepository.update(id, {
      ...updateAdminDto,
      updated_at: new Date(),
    });
  }

  async remove(id: string) {
    const adminExists = await this.adminRepository.findOneBy({ id });

    if (!adminExists) {
      throw new HttpException('admin não encontrado', HttpStatus.NOT_FOUND);
    }

    return this.adminRepository.delete(id);
  }

  async changePassword(changePassword: ChangePasswordAdminDto) {
    if (changePassword.password !== changePassword.confirm_password) {
      throw new HttpException(
        'As senhas são diferentes',
        HttpStatus.BAD_REQUEST,
      );
    }

    const resultToken: any = await jwt.verify(
      changePassword.token,
      process.env.SECRET_AUTH,
    );

    if (!resultToken) {
      throw new HttpException(
        'Token inválido ou expirado',
        HttpStatus.BAD_REQUEST,
      );
    }

    const responseAdmin = await this.adminRepository.findOneBy({
      email: resultToken.email,
    });

    if (!responseAdmin) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }

    const salt = await bcrypt.genSalt();

    responseAdmin.password = await bcrypt.hash(changePassword.password, salt);

    return this.adminRepository.update(responseAdmin.id, {
      ...responseAdmin,
      updated_at: new Date(),
    });
  }
}
