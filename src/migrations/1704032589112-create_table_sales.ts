import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableSales1704032589112 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        CREATE TABLE sales (
            id UUID PRIMARY KEY,
            client_id UUID REFERENCES clients(id),
            status_id INT REFERENCES status_sales(id),
            payment_id INT REFERENCES forms_payments(id),
            delivery_id INT REFERENCES form_delivery(id),
            change_money DOUBLE PRECISION,
            installments INT,
            list_products JSON,
            total DOUBLE PRECISION NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ); 
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        DROP TABLE sales;
    `);
  }
}
