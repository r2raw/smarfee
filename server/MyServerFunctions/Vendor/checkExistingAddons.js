export default async (db, prodName,storeId, size)=>{
    try {
        const sql = "SELECT productName FROM storeAddons WHERE LOWER(REPLACE(productName, ' ', '')) = $1 AND storeId = $2 AND size=$3";
        const result = await db.query(sql, [prodName, storeId, size])

 
        
        console.log(result.rows)
        if(result.rowCount > 0){
            return true;
        }
        return false;
        
    } catch (error) {
        console.error("check existing error: " + error.message)
    }
}
