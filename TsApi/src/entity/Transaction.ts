import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
import { User } from "./User";
import { Item } from "./Item";
import { TransactionType } from "./TransactionType";

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.transactions2)
  fromUser: User;

  @ManyToOne(() => User, (user) => user.transactions1)
  toUser: User;

  @ManyToOne(() => Item, (item) => item.transactions)
  item: Item;

  @CreateDateColumn()
  transactionDate: Date;

  @Column()
  transactionQty: number;

  @ManyToOne(
    () => TransactionType,
    (transactionType) => transactionType.transactionName
  )
  transactionType: TransactionType;
}
