import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableProducts1704031467394 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        CREATE TABLE products (
            id UUID PRIMARY KEY,
            name VARCHAR(150) NOT NULL,
            price DOUBLE PRECISION NOT NULL,
            stock INTEGER NOT NULL,
            img_product VARCHAR(255) NOT NULL,
            unavailable BOOLEAN NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            category_id INT REFERENCES categories_product(id),
            admin_id UUID REFERENCES admins(id)
        );  
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
            DROP TABLE products;
        `);
  }
}
