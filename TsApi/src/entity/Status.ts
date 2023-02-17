import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Item } from "./Item";

@Entity()
export class Status {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status_name: string;

  @OneToMany(() => Item, (item) => item.status)
  items: Item[];
}
