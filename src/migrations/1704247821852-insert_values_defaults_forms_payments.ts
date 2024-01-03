import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertValuesDefaultsFormsPayments1704247821852
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        INSERT INTO forms_payments (id, name, type) VALUES (1, 'Dinheiro', 'money');
        INSERT INTO forms_payments (id, name, type) VALUES (2, 'Pix', 'pix');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`DELETE FROM forms_payments WHERE id IN (1, 2);`);
  }
}
