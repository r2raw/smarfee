import _ from "lodash"
export default async (db, storename)=>{
    try {
        const getStoreName = await db.query("SELECT name from storeInfo WHERE LOWER(name)= LOWER($1)", [_.trim(storename)]);
        return getStoreName;
        
    } catch (error) {
        console.error("ERROR IN GetStoreName: " + error.message)
    }
};