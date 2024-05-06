export default async (db, uid, email) => {
    try {
        const sql = 'UPDATE userAcc set email=$1 WHERE id=$2'

        const result = await db.query(sql, [email, uid])

        if(result.rowCount > 0){
            return true
        }

        return false
    } catch (error) {
        console.error("update user email error: " + error.message)
    }
}