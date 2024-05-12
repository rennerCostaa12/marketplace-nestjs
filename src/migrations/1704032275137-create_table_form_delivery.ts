import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableFormDelivery1704032275137
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'form_delivery',
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
        ],
      }),
    );

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('form_delivery')
      .values([
        {
          id: 1,
          name: 'Retirada',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 2,
          name: 'Entrega',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ])
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('form_delivery');
  }
}
