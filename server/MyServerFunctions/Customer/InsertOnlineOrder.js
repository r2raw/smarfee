export default async (db, store_id, product_id, user_id, order_number, product_quantity, amount_payable, service_type)=>{
    try {
        const sql = "INSERT INTO orders(store_id, product_id, user_id, order_number, product_quantity, amount_payable, order_type, payment_type, service_type, status, paid) VALUES ($1, $2,$3,$4,$5,$6,$7,$8,$9,$10,$11)"
        const result = await db.query(sql, [store_id, product_id, user_id, order_number, product_quantity, amount_payable, 'Online', 'Over the counter', service_type, 'Pending', false])

        if(result.rowCount > 0){
            return true;
        }
        return false
    } catch (error) {
        console.error("Insert Online Order Error: " + error.message)
    }
}