import { MigrationInterface, QueryRunner } from 'typeorm';

export class Users1643758676019 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users"
       ("user_id" SERIAL NOT NULL,
        "user_name" character varying NOT NULL,
         "user_email" character varying NOT NULL,
          "user_password" character varying NOT NULL,
           "created_at" TIMESTAMP NOT NULL,
            "updated_at" TIMESTAMP NOT NULL,
             "deleted_at" TIMESTAMP,
              CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("user_id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
