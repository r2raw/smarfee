export default async (db) => {
    try {
      const selectStore = await db.query(
        "SELECT userAcc.dateCreated as date_created, vendor.id AS vendor_id, vendor.firstname, vendor.lastname, vendor.birthdate, vendor.phone AS vendor_phone, vendor.sex, store.id AS store_id, store.storeImg, store.name AS store_name, store.email AS store_email,  store.valid_id, store.phone AS store_phone, store.dti, store.clearance, store.permit, store.approvalStatus, store.dateApproved FROM vendorProfile AS vendor JOIN userAcc AS userAcc ON vendor.userId = userAcc.id JOIN storeInfo AS store ON vendor.id = store.id"
      );
  
      if (selectStore.rows && selectStore.rows.length > 0) {
        const stores = selectStore.rows.map((store) => {
          return store;
        });
        return stores;
      } else {
        console.log("No stores found.");
        return [];
      }
    } catch (error) {
      console.error("Select store info Error: " + error);
      return [];
    }
  };
  