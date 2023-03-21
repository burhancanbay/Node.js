import { MigrationInterface, QueryRunner } from "typeorm";

export class ConvertUserName1678546348216 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE OR REPLACE FUNCTION convert_user_name(u_name character varying) 
        RETURNS INTEGER
        LANGUAGE plpgsql
        AS $$
        DECLARE 
            user_id INTEGER;
        BEGIN
            user_id:=(SELECT id FROM "user" WHERE user_name=u_name);
        RETURN user_id;		
        END $$;
        
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
