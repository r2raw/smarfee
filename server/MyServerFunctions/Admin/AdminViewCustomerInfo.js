export default async (db, uid)=>{
    try {
        const sql = "SELECT ua.id as userid, ua.status, ua.role, ua.email, ua.dateCreated, up.* FROM userAcc AS ua LEFT JOIN userProfile AS up ON ua.id = up.id WHERE ua.id = $1;"

        const customerInfo = await db.query(sql, [uid]);

        return customerInfo.rows[0];
        
    } catch (error) {
        console.error("AdminViewCustomerInfo error: " + error)
    }
}