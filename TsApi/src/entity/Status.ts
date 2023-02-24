import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Item } from "./Item";

@Entity()
export class Status {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "status_name", nullable: false, unique: true })
  statusName: string;

  @OneToMany(() => Item, (item) => item.statusId)
  items: Item[];
}
