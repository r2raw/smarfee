export default async (db, data, prodCode,img)=>{
    try {
        const sql = "INSERT into storeAddOns(storeId, productCode, productName, productPrice, size, availability, productImg) VALUES ($1, $2, $3, $4, $5, $6,$7)"
        const result = db.query(sql, [data.storeId, prodCode, data.name, data.price, data.size, "Available", img])

        if (result.rowCount > 0){
            return true;
        }
        return false
    } catch (error) {
        console.error("Add store addons error: " + error.message)
    }
}