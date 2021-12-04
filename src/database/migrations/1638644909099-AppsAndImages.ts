import {MigrationInterface, QueryRunner} from "typeorm";

export class AppsAndImages1638644909099 implements MigrationInterface {
    name = 'AppsAndImages1638644909099'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "category" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "image" ("id" integer PRIMARY KEY NOT NULL, "url" varchar NOT NULL, "app_id" integer NOT NULL, "is_icon" boolean NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "apps" ("id" integer PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "developer" varchar NOT NULL, "rate" varchar NOT NULL, "category_id" varchar NOT NULL, "description" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "temporary_image" ("id" integer PRIMARY KEY NOT NULL, "url" varchar NOT NULL, "app_id" integer NOT NULL, "is_icon" boolean NOT NULL, CONSTRAINT "FK_407f8c324f3a00dc56e6e154e17" FOREIGN KEY ("app_id") REFERENCES "apps" ("id") ON DELETE CASCADE ON UPDATE CASCADE)`);
        await queryRunner.query(`INSERT INTO "temporary_image"("id", "url", "app_id", "is_icon") SELECT "id", "url", "app_id", "is_icon" FROM "image"`);
        await queryRunner.query(`DROP TABLE "image"`);
        await queryRunner.query(`ALTER TABLE "temporary_image" RENAME TO "image"`);
        await queryRunner.query(`CREATE TABLE "temporary_apps" ("id" integer PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "developer" varchar NOT NULL, "rate" varchar NOT NULL, "category_id" varchar NOT NULL, "description" varchar NOT NULL, CONSTRAINT "FK_dbbf46322d277c0a03346d67f91" FOREIGN KEY ("category_id") REFERENCES "category" ("id") ON DELETE CASCADE ON UPDATE CASCADE)`);
        await queryRunner.query(`INSERT INTO "temporary_apps"("id", "name", "developer", "rate", "category_id", "description") SELECT "id", "name", "developer", "rate", "category_id", "description" FROM "apps"`);
        await queryRunner.query(`DROP TABLE "apps"`);
        await queryRunner.query(`ALTER TABLE "temporary_apps" RENAME TO "apps"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "apps" RENAME TO "temporary_apps"`);
        await queryRunner.query(`CREATE TABLE "apps" ("id" integer PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "developer" varchar NOT NULL, "rate" varchar NOT NULL, "category_id" varchar NOT NULL, "description" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "apps"("id", "name", "developer", "rate", "category_id", "description") SELECT "id", "name", "developer", "rate", "category_id", "description" FROM "temporary_apps"`);
        await queryRunner.query(`DROP TABLE "temporary_apps"`);
        await queryRunner.query(`ALTER TABLE "image" RENAME TO "temporary_image"`);
        await queryRunner.query(`CREATE TABLE "image" ("id" integer PRIMARY KEY NOT NULL, "url" varchar NOT NULL, "app_id" integer NOT NULL, "is_icon" boolean NOT NULL)`);
        await queryRunner.query(`INSERT INTO "image"("id", "url", "app_id", "is_icon") SELECT "id", "url", "app_id", "is_icon" FROM "temporary_image"`);
        await queryRunner.query(`DROP TABLE "temporary_image"`);
        await queryRunner.query(`DROP TABLE "apps"`);
        await queryRunner.query(`DROP TABLE "image"`);
        await queryRunner.query(`DROP TABLE "category"`);
    }

}
