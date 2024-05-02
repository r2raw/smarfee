import React from "react";

import dayjs from "dayjs";
function VoucherEndDate() {
  const tomorrow = dayjs(Date.now()).add(1, "day").format("YYYY-MM-DD");
  return (
    <div className="voucher-date end">
      <h3>Valid until: </h3>
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
        <span className="floating-label">End date</span>
      </div>
      <div className="input-group">
        <input type="time" placeholder=" " className="card" />
        <span className="floating-label">End time</span>
      </div>
    </div>
  );
}

export default VoucherEndDate;
