import React from "react";
import DoneAllSharpIcon from "@mui/icons-material/DoneAllSharp";
function Successful(props) {
  const { message } = props;
  return (
    <div className="result">
      <div className="result-icon">
        <DoneAllSharpIcon />
      </div>
      <h2>{message}</h2>
    </div>
  );
}

export default Successful;
