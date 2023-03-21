import { ViewEntity, ViewColumn, DataSource } from "typeorm";
import { Release } from "./Release";
import { Item } from "./Item";

@ViewEntity({
  expression: (dataSource: DataSource) =>
    dataSource
      .createQueryBuilder()
      .select("release.id", "id")
      .addSelect("release.quantity", "release_quantity")
      .addSelect("item.name", "item_name")
      .from(Release, "release")
      .leftJoin(Item, "item", "item.id = release.item"),
})
export class ReleaseView {
  @ViewColumn()
  id: number;

  @ViewColumn()
  quantity: number;

  @ViewColumn()
  name: string;
}
