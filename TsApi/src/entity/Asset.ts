import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Generated,
} from "typeorm";
import { User } from "./User";
import { Item } from "./Item";

@Entity("asset")
export class Asset {
  // @Column()
  // @Generated()
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "asset_qty", nullable: false })
  quantity: number;

  // @PrimaryColumn()
  @ManyToOne(() => User, (user) => user.assets, { nullable: false })
  @JoinColumn({
    name: "user_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "fk_user_id",
  })
  user: User;

  // @PrimaryColumn()
  @ManyToOne(() => Item, (item) => item.assets, { nullable: false })
  @JoinColumn({
    name: "item_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "fk_item_id",
  })
  item: Item;

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
}
