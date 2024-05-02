export default async (db, id, comment) =>{
    try {
        const sql1 = "UPDATE storeInfo set approvalStatus = 'Rejected' WHERE id =$1"

        const updateResult = await db.query(sql1, [id]);

        if(updateResult.rowCount > 0){
            const sql2 = "INSERT into rejectedApplication(id,comment) VALUES($1, $2)"
            const insertResult = await db.query(sql2, [id, comment]);

            if(insertResult.rowCount > 0){
                return true;
            }
        }

        return null
    } catch (error) {
        console.error("Reject application error: " + error.message)
    }
}