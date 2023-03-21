import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";
import { Asset } from "./Asset";
import { Transaction } from "./Transaction";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcryptjs";

@Entity("user")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "user_name", nullable: false, unique: true })
  name: string;

  @Column({ name: "user_address", nullable: false, unique: true })
  address: string;

  setAddress = (address: string) => {
    return (this.address = bcrypt.hashSync(address, 8));
  };

  isValidAddress = (address: string) => {
    return bcrypt.compareSync(address, this.address);
  };

  generateJWT = () => {
    return jwt.sign(
      {
        id: this.id,
        name: this.name,
        address: this.address,
      },
      "secret",
      {
        expiresIn: "1h",
      }
    );
  };

  @CreateDateColumn({
    type: "timestamp with time zone",
    // default: () => "CURRENT_TIMESTAMP",
    nullable: false,
    name: "created_at",
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: "timestamp with time zone",
    // default: () => "CURRENT_TIMESTAMP",
    name: "updated_at",
  })
  updatedAt: Date;

  @DeleteDateColumn({
    type: "timestamp with time zone",
    // default: () => "CURRENT_TIMESTAMP",
    name: "deleted_at",
  })
  deletedAt: Date;

  @OneToMany(() => Asset, (asset) => asset.user)
  assets: Asset[];

  @OneToMany(() => Transaction, (transaction) => transaction.toUser)
  transactions1: Transaction[];

  @OneToMany(() => Transaction, (transaction) => transaction.fromUser)
  transactions2: Transaction[];
}
