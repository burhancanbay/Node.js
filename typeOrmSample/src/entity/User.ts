import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcryptjs";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;

  @Column({ name: "user_email", nullable: false, unique: true })
  email: string;

  @Column({ name: "user_password", nullable: false, unique: true })
  password: string;

  setPassword = (password: string) => {
    return (this.password = bcrypt.hashSync(password, 8));
  };

  isValidPassword = (password: string) => {
    return bcrypt.compareSync(password, this.password);
  };

  generateJWT = () => {
    return jwt.sign(
      {
        id: this.id,
        email: this.email,
        password: this.password,
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
}
