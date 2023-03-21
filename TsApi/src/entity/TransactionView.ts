import { ViewEntity, ViewColumn, DataSource } from "typeorm";

import { Item } from "./Item";
import { Category } from "./Category";
import { Transaction } from "./Transaction";
import { User } from "./User";
import { TransactionType } from "./TransactionType";

@ViewEntity({
  expression: (dataSource: DataSource) =>
    dataSource
      .createQueryBuilder()
      .select("transaction.id", "id")
      .addSelect("transaction.quantity", "transaction_quantity")
      .addSelect("fromUser.name", "from_user_name")
      .addSelect("toUser.name", "to_user_name")
      .addSelect("item.name", "item_name")
      .addSelect("transactionType.name", "transaction_type_name")
      .from(Transaction, "transaction")
      .leftJoin(User, "toUser", "toUser.id = transaction.toUser")
      .leftJoin(User, "fromUser", "fromUser.id = transaction.fromUser")
      .leftJoin(Item, "item", "item.id = transaction.item")
      .leftJoin(
        TransactionType,
        "transactionType",
        "transactionType.id = transaction.type"
      ),
})
export class TransactionView {
  @ViewColumn()
  id: number;

  @ViewColumn()
  quantity: number;

  @ViewColumn()
  fromUser: string;

  @ViewColumn()
  toUser: string;

  @ViewColumn()
  itemName: string;

  @ViewColumn()
  transactionTypeName: string;
}
