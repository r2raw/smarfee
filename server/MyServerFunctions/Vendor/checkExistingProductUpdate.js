export default async (db, storeId, prodName, size, product_id) =>{
    try {
        const sql = "SELECT productname FROM storeProducts WHERE LOWER(REPLACE(productname, ' ', '')) = LOWER($1) AND storeId = $2 AND size=$3 AND id != $4";
        const result = await db.query(sql, [prodName, storeId, size, product_id])


        if(result.rowCount > 0){
            return true;
        }
        return false;
    } catch (error) {
        console.error("check update existing product error: " + error.message);
    }
}