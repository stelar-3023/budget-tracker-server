import { MigrationInterface, QueryRunner } from 'typeorm';

export class Transaction1643408456522 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "transaction" 
            ("id" SERIAL NOT NULL,
             "description" character varying NOT NULL,
              "amount" integer NOT NULL,
               "created_at" TIMESTAMP NOT NULL,
                "updated_at" TIMESTAMP NOT NULL,
                 "deleted_at" TIMESTAMP,
                  CONSTRAINT "PK_c5f9b9b9b9b9b9b9b9b9b9b9b" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "transaction"`);
  }
}
