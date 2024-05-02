import React from "react";
import ThumbDownOffAltSharpIcon from "@mui/icons-material/ThumbDownOffAltSharp";
function Rejected(props) {
    const {message} = props;
  return (
    <div className="result">
      <div className="result-icon">
        <ThumbDownOffAltSharpIcon />
      </div>
      <h2>{message}</h2>
    </div>
  );
}

export default Rejected;
