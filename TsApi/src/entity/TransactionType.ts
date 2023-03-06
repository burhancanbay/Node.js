import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Transaction } from "./Transaction";

@Entity()
export class TransactionType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "transaction_name", nullable: false, unique: true })
  name: string;

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

  @OneToMany(() => Transaction, (transaction) => transaction.type)
  transactions: Transaction[];
}
