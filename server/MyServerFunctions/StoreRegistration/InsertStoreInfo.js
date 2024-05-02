import _ from "lodash";
export default async (
  db,
  uid,
  data,
  imageFile,
  pdfDti,
  pdfClearance,
  pdfPermit,
  validId
) => {
  try {
    const insertStore = await db.query(
      "INSERT INTO storeInfo (id, name, email, phone, storeImg, dti, clearance, permit,  approvalStatus, valid_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)",
      [
        uid,
        _.trim(data.storeName),
        _.trim(data.email),
        data.phone,
        imageFile.filename,
        pdfDti.filename,
        pdfClearance.filename,
        pdfPermit.filename,
        "Pending",
        validId.filename,
      ]
    );
  } catch (error) {
    console.error("Store info error:  " + error);
  }
};
