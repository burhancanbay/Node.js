import { MigrationInterface, QueryRunner } from "typeorm";

export class ReleaseBeforeInsert1678097679875 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE OR REPLACE FUNCTION release_before_insert() RETURNS TRIGGER
        BEGIN
          IF (SELECT COUNT(*) FROM asset 
          WHERE user_id = 1 AND item_id = NEW.item_id) = 0 THEN
          INSERT INTO asset (asset_qty, user_id, item_id) VALUES (0, 1, NEW.item_id);			
          END IF;
          RETURN NEW;	
        END;
        CREATE TRIGGER release_before_insert
        BEFORE INSERT
          ON "release"
          FOR EACH ROW
          EXECUTE PROCEDURE release_before_insert();
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
