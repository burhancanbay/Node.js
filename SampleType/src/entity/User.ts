import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Category } from "./Category";
import { Team } from "./Team";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "first_name" })
  firstName: string;

  @Column({ name: "last_name" })
  lastName: string;

  @Column()
  age: number;

  @ManyToOne(() => Category, (category) => category.users)
  @JoinColumn({
    name: "category_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "fk_cat_id",
  })
  categoryId: Category;

  @ManyToOne(() => Team, (team) => team.users)
  @JoinColumn({
    name: "team_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "fk_team_id",
  })
  teamId: Team;
}
