export default async (db, uid)=>{
    try {
        const sql = "UPDATE userAcc set status = 'Deactivated' WHERE id=$1"
        const result = await db.query(sql, [uid]);
        if(result.rowCount > 0){
            return true
        }

        return null
    } catch (error) {
        console.error("update deactivation error" + error.message)
    }
}