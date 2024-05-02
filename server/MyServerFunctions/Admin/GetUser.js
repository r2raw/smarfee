export default async (db) => {
    try {
      const selectStore = await db.query(
        "SELECT * from userAcc"
      );
      if (selectStore.rows && selectStore.rows.length > 0) {
        const stores = selectStore.rows.map((store) => {
          return store;
        });
        return stores;
      } else {
        console.log("No user acc found.");
        return [];
      }
    } catch (error) {
      console.error("Select store info Error: " + error);
      return [];
    }
  };
  