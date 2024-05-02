export default async (db, storeId) => {
    try {
      const selectStore = await db.query(
        "SELECT * from operationDay WHERE storeId=$1",[storeId]
      );
  
      if (selectStore.rows && selectStore.rows.length > 0) {
        const stores = selectStore.rows.map((store) => {
          return store;
        });
        return stores;
      } else {
        console.log("No store operation found.");
        return [];
      }
    } catch (error) {
      console.error("Select store info Error: " + error);
      return [];
    }
  };
  