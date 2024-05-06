export default async (db, uid) =>{
    try {
        const sql = "SELECT COUNT(id) FROM userProfile WHERE id=$1"

        const result = await db.query(sql, [uid])

        if(parseInt(result.rows[0].count) > 0){
            return true
        }

        return false
        
    } catch (error) {
        console.error("verifyUserProfileExist error: " + error.message)
    }
}