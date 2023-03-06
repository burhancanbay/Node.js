import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Item } from "./Item";

@Entity()
export class Contract {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "contract_address", unique: true, nullable: false })
  address: string;

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

  @OneToMany(() => Item, (item) => item.contract)
  items: Item[];
}
