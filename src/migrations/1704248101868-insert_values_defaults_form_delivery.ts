import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertValuesDefaultsFormDelivery1704248101868
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        INSERT INTO form_delivery (id, name) VALUES (1, 'Retirada');
        INSERT INTO form_delivery (id, name) VALUES (2, 'Entrega');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`DELETE FROM form_delivery WHERE id IN (1, 2);`);
  }
}
