import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Transaction } from "./Transaction";

@Entity("transaction_type")
export class TransactionType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "transaction_name", nullable: false, unique: true })
  name: string;

  @CreateDateColumn({
    type: "time with time zone",
    default: () => "now()",
    nullable: false,
    name: "created_at",
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: "time with time zone",
    default: () => "now()",
    nullable: false,
    name: "updated_at",
  })
  updatedAt: Date;

  @OneToMany(() => Transaction, (transaction) => transaction.type)
  transactions: Transaction[];
}
