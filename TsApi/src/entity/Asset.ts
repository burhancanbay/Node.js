import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";
import { Item } from "./Item";

@Entity()
export class Asset {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.assets)
  user: User;

  @ManyToOne(() => Item, (item) => item.assets)
  item: Item;

  @Column()
  assetQty: number;
}
