export default async (db) =>{
    try {
        const sql = 'SELECT COUNT(distinct(order_number)) from orders'
        const result = await db.query(sql);

        return result.rows[0].count
    } catch (error) {
        console.error("ORDER COUNT ERROR: " + error.message);
    }
}