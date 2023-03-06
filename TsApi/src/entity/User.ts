import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Asset } from "./Asset";
import { Transaction } from "./Transaction";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "user_name", nullable: false, unique: true })
  name: string;

  @Column({ name: "user_address", nullable: false, unique: true })
  address: string;

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

  @OneToMany(() => Asset, (asset) => asset.user)
  assets: Asset[];

  @OneToMany(() => Transaction, (transaction) => transaction.toUser)
  transactions1: Transaction[];

  @OneToMany(() => Transaction, (transaction) => transaction.fromUser)
  transactions2: Transaction[];
}
