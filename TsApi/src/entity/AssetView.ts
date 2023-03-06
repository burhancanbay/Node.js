import { ViewEntity, ViewColumn, DataSource } from "typeorm";

import { Item } from "./Item";
import { Category } from "./Category";
import { Contract } from "./Contract";
import { Status } from "./Status";
import { Asset } from "./Asset";
import { User } from "./User";

@ViewEntity({
  expression: (dataSource: DataSource) =>
    dataSource
      .createQueryBuilder()
      .select("asset.id", "id")
      .addSelect("user.name", "user_name")
      .addSelect("item.name", "item_name")
      .addSelect("asset.quantity", "asset_quantity")
      .from(Asset, "asset")
      .leftJoin(User, "user", "user.id = asset.user")
      .leftJoin(Item, "item", "item.id = asset.item"),
})
export class AssetView {
  @ViewColumn()
  id: number;

  @ViewColumn()
  userName: string;

  @ViewColumn()
  itemName: string;

  @ViewColumn()
  assetQuantity: string;
}
