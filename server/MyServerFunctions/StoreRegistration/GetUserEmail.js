import _ from "lodash"
export default async (db, email)=>{
    try {
        const getEmail = await db.query("SELECT email from userAcc WHERE LOWER(email)=LOWER($1)", [_.trim(email)]);
        return getEmail;
        
    } catch (error) {
        console.error("ERROR IN GetUserEmail: " + error.message)
    }
};