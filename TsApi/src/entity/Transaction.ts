import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
  BeforeInsert,
} from "typeorm";
import { User } from "./User";
import { Item } from "./Item";
import { TransactionType } from "./TransactionType";

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    default: () => "CURRENT_TIMESTAMP",
    name: "transaction_date",
    nullable: false,
  })
  transactionDate: Date;

  @Column({ name: "transaction_qty", nullable: false })
  transactionQty: number;

  @ManyToOne(() => User, (user) => user.transactions2)
  @JoinColumn({
    name: "from_user_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "fk_from_user_id",
  })
  fromUserId: User;

  @ManyToOne(() => User, (user) => user.transactions1)
  @JoinColumn({
    name: "to_user_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "fk_to_user_id",
  })
  toUserId: User;

  @ManyToOne(() => Item, (item) => item.transactions)
  @JoinColumn({
    name: "item_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "fk_item_id",
  })
  itemId: Item;

  @ManyToOne(
    () => TransactionType,
    (transactionType) => transactionType.transactionName
  )
  @JoinColumn({
    name: "type_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "fk_type_id",
  })
  typeId: TransactionType;
}
