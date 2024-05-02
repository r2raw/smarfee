export default async (db, storeId)=>{
    try {
        const sql = "SELECT * from storeAddons WHERE storeId=$1";
        const result = await db.query(sql, [storeId])
        if (result.rowCount > 0){
            return result.rows;
        }

        return []
        
    } catch (error) {
        console.error("getStoreAddOns error: " + error.message)
    }
}