import React from "react";
import dayjs from "dayjs";

function VoucherStartDate() {
  const tomorrow = dayjs(Date.now()).add(1, "day").format("YYYY-MM-DD");
  return (
    <div className="voucher-date start">
      <h3>Valid from:</h3>
      <div className="input-group">
        <input
          className="card"
          type="date"
          placeholder=" "
          min={tomorrow}
          onKeyDown={(e) => {
            e.preventDefault();
          }}
        />
        <span className="floating-label">Start date</span>
      </div>
      <div className="input-group">
        <input type="time" placeholder=" " className="card" />
        <span className="floating-label">Start time</span>
      </div>
    </div>
  );
}

export default VoucherStartDate;
