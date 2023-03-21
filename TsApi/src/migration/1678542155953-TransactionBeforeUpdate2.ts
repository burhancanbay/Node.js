import { MigrationInterface, QueryRunner } from "typeorm";

export class TransactionBeforeUpdate21678542155953
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE OR REPLACE FUNCTION transaction_before_update2()
        RETURNS TRIGGER
        AS
        $$
        BEGIN
            UPDATE asset
            SET asset_qty = asset_qty - OLD.transaction_qty
            WHERE user_id = OLD.to_user_id AND item_id = OLD.item_id;
        RETURN NEW;	
        END;
        $$
        LANGUAGE plpgsql;
        
        CREATE TRIGGER transaction_before_update2
        BEFORE UPDATE
        ON "transaction"
        FOR EACH ROW
        EXECUTE PROCEDURE transaction_before_update2();
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
