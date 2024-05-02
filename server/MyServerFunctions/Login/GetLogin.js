export default async (db, email) => {
    try {
      const selectStore = await db.query(
        "SELECT id, role, password, status from userAcc WHERE email=$1",[email]
      );
  
      if (selectStore.rows && selectStore.rows.length > 0) {
        const stores = selectStore.rows.map((store) => {
          return store;
        });
        return stores;
      } else {
        console.log("No user found.");
        return [];
      }
    } catch (error) {
      console.error("get login info Error: " + error);
      return [];
    }
  };
  