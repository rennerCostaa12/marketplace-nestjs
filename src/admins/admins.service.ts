import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './entities/admin.entity';

@Injectable()
export class AdminsService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
  ) {}

  create(createAdminDto: CreateAdminDto) {
    const admin = this.adminRepository.create(createAdminDto);
    return this.adminRepository.save(admin);
  }

  findAll() {
    return this.adminRepository.find();
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
}
