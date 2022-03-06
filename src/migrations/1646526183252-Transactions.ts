import { MigrationInterface, QueryRunner } from 'typeorm';

export class Transactions1646526183252 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "transactions" 
        ("id" uuid NOT NULL DEFAULT uuid_generate_v4(),
         "userId" uuid NOT NULL,
          "description" character varying NOT NULL,
           "amount" integer NOT NULL,
            "created_at" TIMESTAMP NOT NULL DEFAULT now(),
             "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
              "deleted_at" TIMESTAMP,
              CONSTRAINT "PK_c0f3f0d3b3c6e5b0f1b4d4e4f4e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" ADD CONSTRAINT "FK_c0f3f0d3b3c6e5b0f1b4d4e4f4e" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "transactions"`);
  }
}
