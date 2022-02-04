import { MigrationInterface, QueryRunner } from 'typeorm';

export class Users1643924905494 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" (
            "user_id" uuid NOT NULL DEFAULT uuid_generate_v4(),
            "user_name" character varying NOT NULL,
            "user_email" character varying NOT NULL,
            "user_password" character varying NOT NULL,
            "created_at" TIMESTAMP NOT NULL DEFAULT now(),
            "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
            "deleted_at" TIMESTAMP,
            CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("user_email"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
