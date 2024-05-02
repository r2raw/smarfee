export default async (db, storeId, size)=>{
    try {
        const sql  = "SELECT COUNT(*) from storeAddons WHERE storeId=$1 AND size=$2"
        const result = await db.query(sql, [storeId, size])

        return result.rows[0].count;
    } catch (error) {
        console.error("count category product error: " + error.message)
    }
}