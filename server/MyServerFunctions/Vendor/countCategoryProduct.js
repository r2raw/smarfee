export default async (db, storeId, category)=>{
    try {
        const sql  = "SELECT COUNT(*) from storeProducts WHERE storeId=$1 AND category=$2"
        const result = await db.query(sql, [storeId, category])

        return result.rows[0];
    } catch (error) {
        console.error("count category product error: " + error.message)
    }
}