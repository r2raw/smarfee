import _ from "lodash";
import { titleCase } from "title-case";
export default async (db, data) => {
  try {
    const sql =
      "UPDATE storeProducts SET productname=$1, productprice=$2, category=$3, type=$4, size=$5, availability=$6 WHERE id=$7";

    const result = await db.query(sql, [
      titleCase(_.toLower(_.trim(data.name))),
      data.price,
      data.category,
      data.type,
      data.size,
      data.availability,
      data.productId,
    ]);

    if (result.rowCount > 0) {
      return true;
    }
    return false;
  } catch (error) {
    console.error("/update no img error: " + error.message);
  }
};
