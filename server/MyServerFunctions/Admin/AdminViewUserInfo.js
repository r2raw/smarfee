export default async (db, uid)=>{
    try {
        const sql = "SELECT u.role, u.status AS user_status, u.dateCreated, u.email, v.*, s.name AS store_name, s.approvalStatus AS approval_status FROM vendorProfile AS v JOIN userAcc AS u ON v.userId = u.id JOIN storeInfo AS s ON v.id = s.id WHERE u.id = $1;"

        const vendorInfo = await db.query(sql, [uid]);

        return vendorInfo.rows[0];
        
    } catch (error) {
        console.error("AdminViewUserInfo error: " + error)
    }
}