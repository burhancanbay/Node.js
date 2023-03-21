import { MigrationInterface, QueryRunner } from "typeorm";

export class TransactionAfterUpdate11678542078595
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE OR REPLACE FUNCTION transaction_after_update1()
        RETURNS TRIGGER
        AS
        $$
        BEGIN
            UPDATE asset
            SET asset_qty = asset_qty - NEW.transaction_qty
            WHERE user_id = NEW.from_user_id AND item_id = NEW.item_id;
        RETURN NEW;	
        END;
        $$
        LANGUAGE plpgsql;
        
        CREATE TRIGGER transaction_after_update1
        AFTER UPDATE
        ON "transaction"
        FOR EACH ROW
        EXECUTE PROCEDURE transaction_after_update1();
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
