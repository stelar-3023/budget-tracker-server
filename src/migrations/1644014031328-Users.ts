import { MigrationInterface, QueryRunner } from 'typeorm';

export class Users1644014031328 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users"
            ("id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying NOT NULL,
                 "email" character varying NOT NULL,
                  "password" character varying not null,
                     "created_at" TIMESTAMP NOT NULL,
                        "updated_at" TIMESTAMP NOT NULL,
                            "deleted_at" TIMESTAMP,
                                CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
