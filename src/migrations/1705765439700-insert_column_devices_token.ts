import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertColumnDevicesToken1705765439700
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        ALTERT TABLE clients ADD COLUMN listDevicesToken text[];
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        ALTER TABLE clients DROP COLUMN listDevicesToken;
    `);
  }
}
