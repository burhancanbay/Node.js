import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
  InsertEvent,
  UpdateEvent,
  RemoveEvent,
  UpdateDateColumn,
} from "typeorm";

import { Item } from "./Item";
import { Asset } from "./Asset";

@Entity("release")
export class Release {
  // beforeInsert(event: InsertEvent<Asset>) {
  //   Set;
  // }
  // afterInsert(event: InsertEvent<Asset>) {}
  // beforeUpdate(event: UpdateEvent<Asset>) {}
  // afterUpdate(event: UpdateEvent<Asset>) {}
  // beforeRemove(event: RemoveEvent<Asset>) {}
  // afterRemove(event: RemoveEvent<Asset>) {}
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "release_qty", nullable: false })
  quantity: number;

  @ManyToOne(() => Item, (item) => item.releases, { nullable: false })
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
