export default async (db, storeId, prodName, size) =>{
    try {
        const sql = "SELECT productName FROM storeProducts WHERE LOWER(REPLACE(productName, ' ', '')) = LOWER($1) AND storeId = $2 AND size=$3";
        const result = await db.query(sql, [prodName, storeId, size])

        if(result.rowCount > 0){
            return true;
        }
        return false;
    } catch (error) {
        console.error("check existing product error: " + error.message);
    }
}