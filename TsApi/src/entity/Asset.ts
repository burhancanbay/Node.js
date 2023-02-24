import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  PrimaryColumn,
} from "typeorm";
import { User } from "./User";
import { Item } from "./Item";

@Entity("asset")
export class Asset {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.assets)
  @JoinColumn({
    name: "user_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "fk_user_id",
  })
  userId: User;

  @ManyToOne(() => Item, (item) => item.assets)
  @JoinColumn({
    name: "item_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "fk_item_id",
  })
  itemId: Item;

  @Column({ name: "asset_qty" })
  assetQty: number;
}
