import { MigrationInterface, QueryRunner } from "typeorm";

export class ReleaseBeforeUpdate1678359721980 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`

CREATE OR REPLACE FUNCTION release_before_update()
RETURNS TRIGGER
AS
$$
BEGIN
	UPDATE asset
    SET asset_qty = asset_qty - OLD.release_qty
    WHERE user_id = 1 AND item_id = OLD.item_id;
RETURN NEW;	
END;
$$
LANGUAGE plpgsql;


CREATE TRIGGER release_before_update
BEFORE UPDATE
ON "release"
FOR EACH ROW
EXECUTE PROCEDURE release_before_update();

        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
