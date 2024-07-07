import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.getOrThrow('DB_HOST'),
  port: parseInt(configService.getOrThrow('DB_PORT')),
  username: configService.getOrThrow('DB_USERNAME'),
  password: configService.getOrThrow('DB_PASSWORD'),
  database: configService.getOrThrow('DB_NAME'),
  url: configService.getOrThrow('DB_URL'),
  ssl: {
    rejectUnauthorized: configService.getOrThrow('DB_SSL'),
  },
  entities: [__dirname + './**/*.entity{.ts,.js}'],
  migrations: [`${__dirname}./../migrations/**`],
});
