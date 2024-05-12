import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableAdmins1704030084790 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'admins',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'uuid_generate_v4()',
          },
          { name: 'username', type: 'varchar', length: '150' },
          { name: 'email', type: 'varchar', isUnique: true },
          { name: 'password', type: 'varchar' },
          { name: 'profile_img', type: 'varchar', isNullable: true },
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
      .into('admins')
      .values([
        {
          id: '385e74dd-3638-41e1-920e-b7a484342324',
          username: 'admin',
          email: 'admin@email.com',
          password:
            '$2b$10$osQdYgadBT8WlXpWs72xTuSc/aavfRtJML5A6lmUJ4aV5Kf5IWMpy',
          profile_img: null,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ])
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('admins');
  }
}
