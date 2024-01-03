import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertValuesDefaultsStatusSales1704249092888
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        INSERT INTO status_sales (id, name, admin_id) VALUES (1, 'Finalizado', '385e74dd-3638-41e1-920e-b7a484342324');
        INSERT INTO status_sales (id, name, admin_id) VALUES (2, 'A Caminho', '385e74dd-3638-41e1-920e-b7a484342324');
        INSERT INTO status_sales (id, name, admin_id) VALUES (3, 'Preparando Pedido', '385e74dd-3638-41e1-920e-b7a484342324');
        INSERT INTO status_sales (id, name, admin_id) VALUES (4, 'Aguardando Visualização', '385e74dd-3638-41e1-920e-b7a484342324');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`DELETE FROM status_sales WHERE id IN (1, 2, 3, 4);`);
  }
}
