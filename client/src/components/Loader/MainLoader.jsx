import React from "react";
import loader from "../my-images/blockload.gif"
function MainLoader() {
  return (
    <div style={loaderStyle}>
      <img src={loader} style={{width: "400px", height: "400px"}} alt="loading"></img>
    </div>
  );
}

export default MainLoader;

const loaderStyle = {
    width: "100%",
    height: "100dvh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
}
