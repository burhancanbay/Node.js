import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
  BeforeInsert,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";
import { Item } from "./Item";
import { TransactionType } from "./TransactionType";

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "transaction_qty", nullable: false })
  quantity: number;

  @ManyToOne(() => User, (user) => user.transactions2, { nullable: false })
  @JoinColumn({
    name: "from_user_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "fk_from_user_id",
  })
  fromUser: User;

  @ManyToOne(() => User, (user) => user.transactions1, { nullable: false })
  @JoinColumn({
    name: "to_user_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "fk_to_user_id",
  })
  toUser: User;

  @ManyToOne(() => Item, (item) => item.transactions, { nullable: false })
  @JoinColumn({
    name: "item_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "fk_item_id",
  })
  item: Item;

  @ManyToOne(
    () => TransactionType,
    (transactionType) => transactionType.transactions,
    {
      nullable: false,
    }
  )
  @JoinColumn({
    name: "type_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "fk_type_id",
  })
  type: TransactionType;

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
}
