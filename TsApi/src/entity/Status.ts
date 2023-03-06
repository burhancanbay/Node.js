import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Item } from "./Item";

@Entity()
export class Status {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "status_name", nullable: false, unique: true })
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

  @OneToMany(() => Item, (item) => item.status)
  items: Item[];
}
