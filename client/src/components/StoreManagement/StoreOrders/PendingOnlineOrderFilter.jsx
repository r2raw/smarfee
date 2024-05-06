import React from "react";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";

function PendingOnlineOrderFilter({ filter, setFilter }) {
  return (
    <div className="input-group">
      <input
        type="text"
        placeholder=" "
        value={filter || ""}
        onChange={(e) => {
          setFilter(e.target.value);
        }}
        required
      />
      <span className="floating-label">Search</span>
      <span className="floating-icon">
        <SearchSharpIcon />
      </span>
    </div>
  );
}

export default PendingOnlineOrderFilter;
