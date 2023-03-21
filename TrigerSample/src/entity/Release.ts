import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  ManyToOne,
  JoinColumn,
  InsertEvent,
} from "typeorm";
import { User } from "./User";
import { Item } from "./Item";

@Entity({ name: "release" })
export class Release {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: "release_qty",
  })
  quantity: number;

  @ManyToOne(() => Item, (item) => item.releases, { nullable: false })
  @JoinColumn({
    name: "item_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "fk_item_id",
  })
  item: Item;
}
