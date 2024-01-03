import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertValuesDefaultsCategoriesProducts1704249467363
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        INSERT INTO categories_product (id, name, admin_id) VALUES (1, 'Comida', '385e74dd-3638-41e1-920e-b7a484342324');
        INSERT INTO categories_product (id, name, admin_id) VALUES (2, 'Bebida', '385e74dd-3638-41e1-920e-b7a484342324');
        INSERT INTO categories_product (id, name, admin_id) VALUES (3, 'Limpeza', '385e74dd-3638-41e1-920e-b7a484342324');
        INSERT INTO categories_product (id, name, admin_id) VALUES (4, 'Brinquedos', '385e74dd-3638-41e1-920e-b7a484342324');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(
      `DELETE FROM categories_product WHERE id IN (1, 2, 3, 4);`,
    );
  }
}
