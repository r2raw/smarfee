export default async (db, uid)=>{
    try {
        const sql = "SELECT ua.id, ua.email, up.firstname, up.lastname, up.phone, up.birthdate, up.sex, up.img FROM userAcc AS ua LEFT JOIN userProfile as up ON ua.id = up.id WHERE ua.id=$1"
        
        const result = await db.query(sql, [uid])
        return result.rows[0];
    } catch (error) {
        console.error("fetchUserData error: " + error.message)
    }
}