import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { User } from "./User";

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "category_name" })
  categoryName: string;

  @OneToMany(() => User, (user) => user.categoryId)
  users: User[];
}
