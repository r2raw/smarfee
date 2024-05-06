export default async (db, uid) =>{
    try {
        
        const sql = "SELECT order_number, store_id, order_type, user_id,payment_type, paid, MIN(date_ordered) AS order_date,service_type,status FROM orders WHERE user_id =$1  AND status =$2 GROUP BY order_number, store_id, order_type, payment_type, paid, user_id, status, service_type ORDER BY order_number, store_id, order_type, payment_type, paid, order_date "
        const result = await db.query(sql, [uid, "Pending"]);

        return result.rows;
    } catch (error) {
        console.error("Fetch User Order: " + error.message)
    }
}