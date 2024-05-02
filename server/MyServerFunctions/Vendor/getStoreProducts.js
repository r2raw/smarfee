export default async (db, storeId) =>{
    try {
        const sql = "SELECT * FROM storeProducts WHERE storeId=$1"
        const result = await db.query(sql, [storeId]);

        console.log(storeId)
        if(result.rowCount > 0){
            return result.rows
        }
        return []
    } catch (error) {
        console.error("get store product error: " + error.message)
    }
}