import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableSales1704032589112 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'sales',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'uuid_generate_v4()',
          },
          {
            name: 'clientId',
            type: 'uuid',
          },
          {
            name: 'statusId',
            type: 'int',
          },
          {
            name: 'paymentsId',
            type: 'int',
          },
          {
            name: 'deliveryId',
            type: 'int',
          },
          {
            name: 'change_money',
            type: 'double precision',
            isNullable: true,
          },
          {
            name: 'installments',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'list_products',
            type: 'json',
          },
          {
            name: 'total',
            type: 'double precision',
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
        ],
        foreignKeys: [
          {
            columnNames: ['clientId'],
            referencedTableName: 'clients',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
          {
            columnNames: ['statusId'],
            referencedTableName: 'status_sales',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
          {
            columnNames: ['paymentsId'],
            referencedTableName: 'forms_payments',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
          {
            columnNames: ['deliveryId'],
            referencedTableName: 'form_delivery',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('sales');
  }
}
