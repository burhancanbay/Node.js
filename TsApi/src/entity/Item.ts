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
  itemName: string;

  @ManyToOne(() => Category, (category) => category.items)
  @JoinColumn({
    name: "category_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "fk_cat_id",
  })
  categoryId: Category;

  @ManyToOne(() => Status, (status) => status.items)
  @JoinColumn({
    name: "status_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "fk_stat_id",
  })
  statusId: Status;

  @ManyToOne(() => Contract, (contract) => contract.items)
  @JoinColumn({
    name: "contract_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "fk_cont_id",
  })
  contractId: Contract;

  @TreeParent()
  @JoinColumn({
    name: "parent_id",
    referencedColumnName: "id",
  })
  parentId: Item;

  @TreeChildren()
  children: Item[];

  @OneToMany(() => Asset, (asset) => asset.itemId)
  assets: Asset[];

  @OneToMany(() => Release, (release) => release.itemId)
  releases: Release[];

  @OneToMany(() => Transaction, (transaction) => transaction.itemId)
  transactions: Transaction[];
}
