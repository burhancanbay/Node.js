import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Asset } from "./Asset";
import { Category } from "./Category";
import { Contract } from "./Contract";
import { Release } from "./Release";
import { Status } from "./Status";
import { Transaction } from "./Transaction";

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 50, unique: true })
  item_code: string;

  @Column({ type: "varchar", length: 50, unique: true })
  game_code: string;

  @Column({ type: "varchar", length: 50, unique: true })
  item_name: string;

  @ManyToOne(() => Category, (category) => category.items)
  @JoinColumn({
    name: "category_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "fk_cat_id",
  })
  category: Category;

  @ManyToOne(() => Status, (status) => status.items)
  @JoinColumn({
    name: "status_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "fk_stat_id",
  })
  status: Status;

  @ManyToOne(() => Contract, (contract) => contract.items)
  @JoinColumn({
    name: "contract_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "fk_cont_id",
  })
  contract: Contract;

  @ManyToOne(() => Item, (item) => item.children)
  @JoinColumn({
    name: "parent_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "fk_item_id",
  })
  parent: Item;

  @OneToMany(() => Item, (item) => item.parent)
  children: Item[];

  @OneToMany(() => Asset, (asset) => asset.item)
  assets: Asset[];

  @OneToMany(() => Release, (release) => release.item)
  releases: Release[];

  @OneToMany(() => Transaction, (transaction) => transaction.item)
  transactions: Transaction[];
}
