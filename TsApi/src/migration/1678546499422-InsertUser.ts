import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertUser1678546499422 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE OR REPLACE PROCEDURE insert_user(user_name character varying, user_address character varying)			
        LANGUAGE plpgsql
        AS $$
        
        BEGIN
        INSERT INTO "user"(user_name,user_address) 
        VALUES (user_name,user_address);
        EXCEPTION
            WHEN unique_violation THEN
            RAISE EXCEPTION 'please be sure that % and %  are unique',
            user_name, user_address;
        END;
        $$;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
