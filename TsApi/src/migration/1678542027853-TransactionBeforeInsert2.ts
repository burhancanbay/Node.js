import { MigrationInterface, QueryRunner } from "typeorm";

export class TransactionBeforeInsert21678542027853
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE OR REPLACE FUNCTION transaction_before_insert2()
        RETURNS TRIGGER
        AS
        $$
        BEGIN
            IF (SELECT COUNT(*) FROM asset 
               WHERE user_id = NEW.to_user_id AND item_id = NEW.item_id) = 0 THEN
               INSERT INTO asset (asset_qty, user_id, item_id) VALUES (0, NEW.to_user_id, NEW.item_id);			
            END IF;
        RETURN NEW;	
        END;
        $$
        LANGUAGE plpgsql;
        
        CREATE TRIGGER transaction_before_insert2
        BEFORE INSERT
        ON "transaction"
        FOR EACH ROW
        EXECUTE PROCEDURE transaction_before_insert2();
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
