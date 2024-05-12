import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableFormsPayments1704032450704
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'forms_payments',
        columns: [
          {
            name: 'id',
            type: 'int',
            isGenerated: true,
            isPrimary: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'type',
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
        ],
      }),
    );

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('forms_payments')
      .values([
        {
          id: 1,
          name: 'Dinheiro',
          type: 'money',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 2,
          name: 'Pix',
          type: 'pix',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ])
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('forms_payments');
  }
}
