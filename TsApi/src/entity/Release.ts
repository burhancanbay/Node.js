import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from "typeorm";

import { Item } from "./Item";

@Entity("release")
export class Release {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "release_qty", nullable: false })
  releaseQty: number;

  @CreateDateColumn({
    default: () => "CURRENT_TIMESTAMP",
    name: "release_date",
    nullable: false,
  })
  releaseDate: Date;

  @ManyToOne(() => Item, (item) => item.releases)
  @JoinColumn({
    name: "item_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "fk_item_id",
  })
  itemId: Item;
}
