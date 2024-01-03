import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertValuesDefaultsAdmin1704248594067
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        INSERT INTO admins (id, username, email, password, profile_img) VALUES ('385e74dd-3638-41e1-920e-b7a484342324', 'admin', 'admin@email.com', '$2b$10$osQdYgadBT8WlXpWs72xTuSc/aavfRtJML5A6lmUJ4aV5Kf5IWMpy', null);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(
      `DELETE FROM admins WHERE id IN ('385e74dd-3638-41e1-920e-b7a484342324');`,
    );
  }
}
