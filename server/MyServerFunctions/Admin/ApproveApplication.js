import dayjs from "dayjs"
const today = dayjs(Date.now()).format("YYYY-MM-DD HH:mm:ss")
export default async (db, storeId)=>{
    try {
        const sql = "UPDATE storeInfo set approvalStatus=$1, dateApproved=$2 WHERE id=$3"
        const result = await db.query(sql, ["Approved", today, storeId])
        if(result.rowCount > 0){
            return true;
        }

        return false;
    } catch (error) {
        console.error("Approve Application Error: " + error.message)
    }
}