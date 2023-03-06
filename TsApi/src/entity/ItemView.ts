import { ViewEntity, ViewColumn, DataSource } from "typeorm";

import { Item } from "./Item";
import { Category } from "./Category";
import { Contract } from "./Contract";
import { Status } from "./Status";

@ViewEntity({
  expression: (dataSource: DataSource) =>
    dataSource
      .createQueryBuilder()
      .select("item.id", "id")
      .addSelect("item.name", "item_name")
      .addSelect("category.name", "category_name")
      .addSelect("contract.address", "contract_address")
      .addSelect("status.name", "status_name")
      .addSelect("item1.name", "parent_name")
      .from(Item, "item")
      .leftJoin(Category, "category", "category.id = item.category")
      .leftJoin(Contract, "contract", "contract.id = item.contract")
      .leftJoin(Status, "status", "status.id = item.status")
      .leftJoin(Item, "item1", "item1.id = item.parent"),
})
export class ItemView {
  @ViewColumn()
  id: number;

  @ViewColumn()
  itemName: string;

  @ViewColumn()
  categoryName: string;

  @ViewColumn()
  contractAddress: string;

  @ViewColumn()
  statusName: string;

  @ViewColumn()
  parentName: string;
}
