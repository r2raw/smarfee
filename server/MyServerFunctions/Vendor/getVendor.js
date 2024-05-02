export default async (db, uid) => {
  try {
    const sql =
      "SELECT u.email, u.status AS account_status, u.dateCreated, u.role, v.*, s.storeimg, s.id AS store_id, s.name AS store_name, s.phone AS store_phone, s.email AS store_email, s.dti, s.permit,s.clearance, s.approvalStatus AS approval_status, s.dateApproved AS approval_date FROM vendorProfile AS v JOIN userAcc AS u on v.userId = u.id JOIN storeInfo AS s on v.id = s.id WHERE u.id =$1";
    const vendorDetails = await db.query(sql, [uid]);
    if (vendorDetails.rowCount > 0) {
      return vendorDetails;
    }
    return null;
  } catch (error) {
    console.error("Get VENDOR ERROR:" + error.message);
  }
};
