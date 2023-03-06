import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
  Tree,
  TreeChildren,
  TreeParent,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Asset } from "./Asset";
import { Category } from "./Category";
import { Contract } from "./Contract";
import { Release } from "./Release";
import { Status } from "./Status";
import { Transaction } from "./Transaction";

@Entity("item")
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: "item_code",
    type: "varchar",
    length: 50,
    unique: true,
    nullable: false,
  })
  itemCode: string;

  @Column({
    name: "game_code",
    type: "varchar",
    length: 50,
    unique: true,
    nullable: false,
  })
  gameCode: string;

  @Column({
    name: "item_name",
    type: "varchar",
    length: 50,
    unique: true,
    nullable: false,
  })
  name: string;

  @ManyToOne(() => Category, (category) => category.items, { nullable: false })
  @JoinColumn({
    name: "category_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "fk_cat_id",
  })
  category: Category;

  @ManyToOne(() => Status, (status) => status.items, { nullable: false })
  @JoinColumn({
    name: "status_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "fk_stat_id",
  })
  status: Status;

  @ManyToOne(() => Contract, (contract) => contract.items, { nullable: false })
  @JoinColumn({
    name: "contract_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "fk_cont_id",
  })
  contract: Contract;

  @TreeParent()
  @JoinColumn({
    name: "parent_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "fk_par_id",
  })
  parent: Item;

  @TreeChildren()
  children: Item[];

  @OneToMany(() => Asset, (asset) => asset.item)
  assets: Asset[];

  @OneToMany(() => Release, (release) => release.item)
  releases: Release[];

  @OneToMany(() => Transaction, (transaction) => transaction.item)
  transactions: Transaction[];

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
