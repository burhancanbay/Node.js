import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Item } from "./Item";

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "category_name", unique: true, nullable: false })
  categoryName: string;

  @OneToMany(() => Item, (item) => item.categoryId)
  items: Item[];
}
