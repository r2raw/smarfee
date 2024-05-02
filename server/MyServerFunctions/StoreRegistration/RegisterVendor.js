import _ from "lodash"
export default async (db, uid, data, vid, vendorImg) =>{
    try {
        const insertVendor = await db.query(
            "INSERT INTO vendorProfile(id, firstname, lastname, phone, sex, birthdate, userId, img) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
            [
              vid,
              _.trim(data.firstname),
              _.trim(data.lastname),
              data.vendorPhone,
              data.sex,
              data.birthdate,
              uid,
              vendorImg,
            ]
          );
    } catch (error) {
        console.error("user vendor error: " + error)
    }
}