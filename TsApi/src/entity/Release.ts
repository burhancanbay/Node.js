import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";

import { Item } from "./Item";

@Entity()
export class Release {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  releaseQty: number;

  @CreateDateColumn()
  releaseDate: Date;

  @ManyToOne(() => Item, (item) => item.releases)
  item: Item;
}
