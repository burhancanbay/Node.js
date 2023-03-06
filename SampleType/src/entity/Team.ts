import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { User } from "./User";

@Entity()
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "team_name" })
  teamName: string;

  @OneToMany(() => User, (user) => user.teamId)
  users: User[];
}
