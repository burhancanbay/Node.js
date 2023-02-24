import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Transaction } from "./Transaction";

@Entity()
export class TransactionType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "transaction_name", nullable: false, unique: true })
  transactionName: string;

  @OneToMany(() => Transaction, (transaction) => transaction.typeId)
  transactions: Transaction[];
}
