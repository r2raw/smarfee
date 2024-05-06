export default async (
  db,
  store_id,
  product_id,
  order_number,
  quantity,
  amount_payable,
  entered_amount,
  change,
  service_type
) => {
  try {
    const sql =
      "INSERT INTO orders(store_id, product_id, order_number, product_quantity, amount_payable, change, entered_amount, order_type, payment_type, paid, service_type, status) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10, $11, $12)";

    const result = await db.query(sql, [
      store_id,
      product_id,
      order_number,
      quantity,
      amount_payable,
      change,
      entered_amount,
      "Over the counter",
      "Over the counter",
      "true",
      service_type,
      "Completed"
    ]);

    if(result.rowCount > 0){
        return true;
    }
    return false;
  } catch (error) {
    console.error("Inserting order error: " + error.message);
  }
};
