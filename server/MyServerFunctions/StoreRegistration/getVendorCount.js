
export default async (db) => {
    try {
        
    const vendorCount = await db.query(
        "SELECT * from vendorProfile",
      );
  
      if (!vendorCount) return null;
      
      return vendorCount.rowCount;
    } catch (error) {
        console.error("Vendor Count Error: " + error)
    }
  }
  
  