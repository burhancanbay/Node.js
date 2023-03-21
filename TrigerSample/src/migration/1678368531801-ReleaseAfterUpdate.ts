import { MigrationInterface, QueryRunner } from "typeorm";

export class ReleaseAfterUpdate1678368531801 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE OR REPLACE FUNCTION release_after_update()
RETURNS TRIGGER
AS
$$
BEGIN
	UPDATE asset
    SET asset_qty = asset_qty + NEW.release_qty
    WHERE user_id = 1 AND item_id = NEW.item_id;
RETURN NEW;	
END;
$$
LANGUAGE plpgsql;


CREATE TRIGGER release_after_update
AFTER UPDATE
ON "release"
FOR EACH ROW
EXECUTE PROCEDURE release_after_update();
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
