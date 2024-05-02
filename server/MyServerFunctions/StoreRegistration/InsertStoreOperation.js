export default async (db, uid, data, operatingDetails) => {
  try {
    operatingDetails.forEach((day) => {
      const sql = `INSERT INTO operationDay (storeId, day, openingTime, closingTime) VALUES ($1, $2, $3, $4)`;

      if (day === "Sunday" || day === "Saturday") {
        if (data.weekendOpening && data.weekendClosing) {
          db.query(
            sql,
            [uid, day, data.weekendOpening, data.weekendClosing],
            (err, result) => {
              if (err) {
                console.error("Error inserting data:", err);
                return;
              }
              return result;
            }
          );
        }else{
          
          db.query(
            sql,
            [uid, day, data.weekdayOpening, data.weekdayClosing],
            (err, result) => {
              if (err) {
                console.error("Error inserting data:", err);
                return;
              }
              return result;
            }
          );
        }
      } else {
        db.query(
          sql,
          [uid, day, data.weekdayOpening, data.weekdayClosing],
          (err, result) => {
            if (err) {
              console.error("Error inserting data:", err);

              return result;
            }
          }
        );
      }
    });
  } catch (error) {
    console.error("Store operation errpr: " + error);
  }
};
