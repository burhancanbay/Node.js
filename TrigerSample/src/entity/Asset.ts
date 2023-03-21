import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./User";
import { Item } from "./Item";

@Entity({ name: "asset" })
export class Asset {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "asset_qty" })
  quantity: number;

  @ManyToOne(() => User, (user) => user.assets, { nullable: false })
  @JoinColumn({
    name: "user_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "fk_user_id",
  })
  user: User;

  @ManyToOne(() => Item, (item) => item.assets, { nullable: false })
  @JoinColumn({
    name: "item_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "fk_item_id",
  })
  item: Item;
}
