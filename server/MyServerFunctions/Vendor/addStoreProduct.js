import _ from "lodash"
export default async (db, data, img, code) => {
  try {
    const sql =
      "INSERT INTO storeProducts (storeId, productName, productPrice, category, type, size, availability, productImg, productCode) VALUES($1, $2, $3, $4, $5,  $6, $7, $8, $9)";

    const result = await db.query(sql, [
      data.storeId,
      _.trim(data.name),
      data.price,
      data.category,
      data.type,
      data.size,
      "Available",
      img,
      code,
    ]);

    if(result.rowCount > 0){
        return result;
    }
    return null;
  } catch (error) {
    console.error("insert store product error: " + error.message);
  }
};
