import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Release } from "./Release";

import { Asset } from "./Asset";

@Entity({ name: "item" })
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "item_name" })
  name: string;

  @OneToMany(() => Release, (release) => release.item)
  releases: Release[];

  @OneToMany(() => Asset, (asset) => asset.item)
  assets: Asset[];
}
