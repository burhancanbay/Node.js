import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Transaction } from "./Transaction";

@Entity()
export class TransactionType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  transactionName: string;

  @OneToMany(() => Transaction, (transaction) => transaction.transactionType)
  transactions: Transaction[];
}
