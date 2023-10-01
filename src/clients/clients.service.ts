import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './entities/client.entity';

import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
  ) {}

  async create(createClientDto: CreateClientDto) {
    const salt = await bcrypt.genSalt();

    createClientDto.password = await bcrypt.hash(
      createClientDto.password,
      salt,
    );

    const client = this.clientRepository.create(createClientDto);
    return this.clientRepository.save(client);
  }

  async findAll(options: IPaginationOptions): Promise<Pagination<Client>> {
    const query = this.clientRepository.createQueryBuilder('client');
    query.orderBy('client.username', 'ASC');
    return paginate(query, options);
  }

  async findOne(id: string) {
    const client = await this.clientRepository.findOneBy({ id });

    if (!client) {
      throw new HttpException('Cliente não encontrado', HttpStatus.NOT_FOUND);
    }

    return client;
  }

  async update(id: string, updateClientDto: UpdateClientDto) {
    const isExistsClient = await this.clientRepository.findOneBy({ id });

    if (!isExistsClient) {
      throw new HttpException('Cliente não encontrado', HttpStatus.NOT_FOUND);
    }

    const salt = await bcrypt.genSalt();

    updateClientDto.password = await bcrypt.hash(
      updateClientDto.password,
      salt,
    );

    return this.clientRepository.update(id, {
      ...updateClientDto,
      updated_at: new Date(),
    });
  }

  async remove(id: string) {
    const isExistsClient = await this.clientRepository.findOneBy({ id });

    if (!isExistsClient) {
      throw new HttpException('Cliente não encontrado', HttpStatus.NOT_FOUND);
    }

    return this.clientRepository.delete(id);
  }
}
