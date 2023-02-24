import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Item } from "./Item";

@Entity()
export class Contract {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "contract_address", unique: true, nullable: false })
  contractAddress: string;

  @OneToMany(() => Item, (item) => item.contractId)
  items: Item[];
}
