import { MigrationInterface, QueryRunner } from "typeorm";

export class TransactionAfterDelete11678542192698
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE OR REPLACE FUNCTION transaction_after_delete1()
        RETURNS TRIGGER
        AS
        $$
        BEGIN
            UPDATE asset
            SET asset_qty = asset_qty + OLD.transaction_qty
            WHERE user_id = OLD.from_user_id AND item_id = OLD.item_id;
        RETURN NEW;
        END;
        $$
        LANGUAGE plpgsql;
        
        CREATE TRIGGER transaction_after_delete1
        AFTER DELETE
        ON "transaction"
        FOR EACH ROW
        EXECUTE PROCEDURE transaction_after_delete1();
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
