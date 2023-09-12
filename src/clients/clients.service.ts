import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './entities/client.entity';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
  ) {}

  create(createClientDto: CreateClientDto) {
    const client = this.clientRepository.create(createClientDto);
    return this.clientRepository.save(client);
  }

  findAll() {
    return this.clientRepository.find();
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
