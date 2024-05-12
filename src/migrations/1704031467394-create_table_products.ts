import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableProducts1704031467394 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'products',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'uuid_generate_v4()',
          },
          { name: 'name', type: 'varchar', length: '150' },
          { name: 'price', type: 'double precision' },
          { name: 'stock', type: 'integer' },
          { name: 'img_product', type: 'varchar' },
          { name: 'unavailable', type: 'boolean' },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
          { name: 'categoriesId', type: 'int' },
          { name: 'adminId', type: 'uuid' },
        ],
        foreignKeys: [
          {
            columnNames: ['categoriesId'],
            referencedTableName: 'categories_product',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
          {
            columnNames: ['adminId'],
            referencedTableName: 'admins',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('products');
  }
}
