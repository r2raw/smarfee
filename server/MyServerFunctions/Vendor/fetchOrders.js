export default async (db, store_id)=>{
    try {
        // const sql = 'SELECT order_number, store_id, order_type, payment_type, paid, order_date FROM (SELECT order_number, store_id, order_type, payment_type, paid, MIN(date_ordered) AS order_date FROM orders WHERE store_id=$1  GROUP BY order_number, store_id, order_type, payment_type, paid) AS subquery ORDER BY order_number, store_id, order_type, payment_type, paid, order_date'

        const sql ="SELECT order_number, store_id, order_type, user_id,payment_type, paid, MIN(date_ordered) AS order_date, service_type, status FROM orders WHERE store_id=$1 GROUP BY order_number, store_id, order_type, payment_type, paid, user_id, status, service_type ORDER BY order_number, store_id, order_type, payment_type, paid, order_date"
        const result = await db.query(sql, [store_id]);

        return result.rows;
        
    } catch (error) {
        console.error("fetch orders error: " + error.message)
    }
}