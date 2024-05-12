import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableCategoriesProducts1704031083038
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'categories_product',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'name', type: 'varchar', length: '150', isUnique: true },
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
          { name: 'adminId', type: 'uuid' },
        ],
        foreignKeys: [
          {
            columnNames: ['adminId'],
            referencedTableName: 'admins',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
        ],
      }),
    );

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('categories_product')
      .values([
        {
          id: 1,
          name: 'Comida',
          created_at: new Date(),
          updated_at: new Date(),
          adminId: '385e74dd-3638-41e1-920e-b7a484342324',
        },
        {
          id: 2,
          name: 'Bebida',
          created_at: new Date(),
          updated_at: new Date(),
          adminId: '385e74dd-3638-41e1-920e-b7a484342324',
        },
        {
          id: 3,
          name: 'Limpeza',
          created_at: new Date(),
          updated_at: new Date(),
          adminId: '385e74dd-3638-41e1-920e-b7a484342324',
        },
        {
          id: 4,
          name: 'Brinquedos',
          created_at: new Date(),
          updated_at: new Date(),
          adminId: '385e74dd-3638-41e1-920e-b7a484342324',
        },
      ]).execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('categories_product');
  }
}
