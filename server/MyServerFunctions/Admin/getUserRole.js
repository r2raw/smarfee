export default async (db, uid)=>{
    try {
        
    const userRole = await db.query("SELECT role FROM userAcc WHERE id=$1",[uid]);
    return userRole;
    } catch (error) {
        console.error("get user role error: " + error.message)
    }
}