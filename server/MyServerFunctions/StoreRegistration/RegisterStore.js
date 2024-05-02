import dayjs from "dayjs";
import _ from "lodash";
export default async (db,uid, data, pass, today) => {
  try {
    
  const insertUser = await db.query(
    "INSERT INTO userAcc (id, email, password, status, role, dateCreated) VALUES($1,$2,$3,$4,$5,$6)",
    [uid, _.trim(data.vendorEmail), pass, "Activated", "Vendor", today]
  );
  } catch (error) {
    console.error("VENDOR ACCOUNT INSERT ERROR: " + error.message)
  }
};
