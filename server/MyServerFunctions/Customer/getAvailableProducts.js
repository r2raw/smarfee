export default async (db)=>{
    try {
        const sql = "SELECT sp.*, si.name from storeProducts as sp JOIN storeinfo AS si ON sp.storeId = si.id JOIN vendorProfile AS vp on si.id = vp.id JOIN userAcc as ua ON vp.userId = ua.id WHERE ua.status='Activated' AND si.approvalStatus = 'Approved' AND sp.availability ='Available'"
        const result = await db.query(sql);

        console.log(result.rows)
        if (result.rowCount > 0){
            return result.rows
        }
        return []
    } catch (error) {
        console.error("get available products error: " + error.message)
    }
}