import { MigrationInterface, QueryRunner } from "typeorm";

export class AddProfilePictureToUser1745255584896 implements MigrationInterface {
    name = 'AddProfilePictureToUser1745255584896'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_product_category"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_user_username"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_user_email"`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_ff0c0301a95e517153df97f6812" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_ff0c0301a95e517153df97f6812"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_user_email" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_user_username" UNIQUE ("username")`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "profile_picture"`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_product_category" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

}
