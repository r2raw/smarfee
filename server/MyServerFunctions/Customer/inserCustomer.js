import dayjs from "dayjs";
import _ from "lodash"
export default async (db,uid, data, pass) => {
  try {
    const today = dayjs(Date.now()).format("YYYY/MM/DD HH:mm:ss");
    const insertUser = await db.query(
    "INSERT INTO userAcc (id, email, password, status, role, dateCreated) VALUES($1,$2,$3,$4,$5,$6)",
    [uid, _.trim(data.email), pass, "Activated", "Customer", today]

  );
  return insertUser;
  } catch (error) {
    console.error("VENDOR ACCOUNT INSERT ERROR: " + error.message)
  }
};
