import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableClients1704030753829 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        CREATE TABLE clients (
            id UUID PRIMARY KEY,
            username VARCHAR(150) NOT NULL,
            email VARCHAR(255) UNIQUE,
            phone VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            profile_img VARCHAR(255),
            address VARCHAR(255) NOT NULL,
            number_address INT NOT NULL,
            complement_address VARCHAR(255),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );  
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
            DROP TABLE clients;
        `);
  }
}
