import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Asset } from "./Asset";
import { Transaction } from "./Transaction";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "user_name", nullable: false, unique: true })
  userName: string;

  @Column({ name: "user_address", nullable: false, unique: true })
  userAddress: string;

  @OneToMany(() => Asset, (asset) => asset.userId)
  assets: Asset[];

  @OneToMany(() => Transaction, (transaction) => transaction.toUserId)
  transactions1: Transaction[];

  @OneToMany(() => Transaction, (transaction) => transaction.fromUserId)
  transactions2: Transaction[];
}
