export default async (db, email, id)=>{
    try {
        const sql =  "SELECT COUNT(email) from userAcc WHERE LOWER(email)=$1  AND id!=$2"

        const result = await db.query(sql, [email, id])

        return parseInt(result.rows[0].count);
    } catch (error) {
        console.error("verify email error: " + error.message)
    }
}