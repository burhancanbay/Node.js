import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Item } from "./Item";

@Entity("category")
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "category_name", unique: true, nullable: false })
  name: string;

  @CreateDateColumn({
    default: () => "CURRENT_TIMESTAMP",
    nullable: false,
    name: "created_at",
  })
  createdAt: Date;

  @UpdateDateColumn({
    default: () => "CURRENT_TIMESTAMP",
    nullable: false,
    name: "updated_at",
  })
  updatedAt: Date;

  @OneToMany(() => Item, (item) => item.category)
  items: Item[];
}
