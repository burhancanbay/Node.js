import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Release } from "./Release";

import { Asset } from "./Asset";

@Entity({ name: "user" })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "user_name" })
  name: string;

  @Column({ name: "user_address" })
  address: string;

  @OneToMany(() => Asset, (asset) => asset.user)
  assets: Asset[];
}
