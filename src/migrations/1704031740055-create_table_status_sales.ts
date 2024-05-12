import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableStatusSales1704031740055 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'status_sales',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
            isUnique: true,
          },
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
          {
            name: 'adminId',
            type: 'uuid',
          },
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
      .into('status_sales')
      .values([
        {
          id: 1,
          name: 'Finalizado',
          created_at: new Date(),
          updated_at: new Date(),
          adminId: '385e74dd-3638-41e1-920e-b7a484342324',
        },
        {
          id: 2,
          name: 'A Caminho',
          created_at: new Date(),
          updated_at: new Date(),
          adminId: '385e74dd-3638-41e1-920e-b7a484342324',
        },
        {
          id: 3,
          name: 'Preparando Pedido',
          created_at: new Date(),
          updated_at: new Date(),
          adminId: '385e74dd-3638-41e1-920e-b7a484342324',
        },
        {
          id: 4,
          name: 'Aguardando Visualização',
          created_at: new Date(),
          updated_at: new Date(),
          adminId: '385e74dd-3638-41e1-920e-b7a484342324',
        },
      ])
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('status_sales');
  }
}
