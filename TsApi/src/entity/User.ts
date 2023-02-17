import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Asset } from "./Asset";
import { Transaction } from "./Transaction";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userName: string;

  @Column()
  userAddress: string;

  @OneToMany(() => Asset, (asset) => asset.user)
  assets: Asset[];

  @OneToMany(() => Transaction, (transaction) => transaction.toUser)
  transactions1: Transaction[];

  @OneToMany(() => Transaction, (transaction) => transaction.fromUser)
  transactions2: Transaction[];
}
