import { MigrationInterface, QueryRunner } from "typeorm";

export class ReleaseAfterInsert1678097597824 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE OR REPLACE FUNCTION release_after_insert()
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
    
    
    CREATE TRIGGER release_after_insert
    AFTER INSERT
    ON "release"
    FOR EACH ROW
    EXECUTE PROCEDURE release_after_insert();
            `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}

// yarn typeorm migration:run -- -d "src/data-source.ts"
