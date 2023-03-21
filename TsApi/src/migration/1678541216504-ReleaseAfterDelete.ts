import { MigrationInterface, QueryRunner } from "typeorm";

export class ReleaseAfterDelete1678541216504 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE OR REPLACE FUNCTION release_after_delete()
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

        CREATE TRIGGER release_after_delete
        AFTER DELETE
        ON "release"
        FOR EACH ROW
        EXECUTE PROCEDURE release_after_delete();
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
