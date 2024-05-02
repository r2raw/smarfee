import _ from "lodash"
export default async (db, email)=>{
    try {
        const getStoreEmail = await db.query("SELECT email from storeInfo WHERE LOWER(email)=LOWER($1)", [_.trim(email)]);
        return getStoreEmail;
        
    } catch (error) {
        console.error("ERROR IN GetStoreEmail: " + error.message)
    }
};