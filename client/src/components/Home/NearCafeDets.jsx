import React from "react";

import kilometerToMeter from "../MyFunctions";
function NearCafeDets(props) {
  const {
    store,
    status,
    address,
    opening_hours,
    name,
    vicinity,
    geometry,
  } = props.store;

  const staticDistance = props.store.distance;
//   elected: "",
//   path: "",
//   distance: "",
//   duration: "",
//   routes: [],
  
  return (
    <div className="near-cafe-dets">
      <h3>{name}</h3>
      <div className="store-status">
        <div
          className={`status ${
            opening_hours && opening_hours.open_now ? `Open` : `Close`
          }`}
        ></div>
        <div>
          <p>
            {opening_hours
              ? opening_hours.open_now
                ? `Open`
                : `Close`
              : `---`}
          </p>
        </div>
      </div>
      <p>{kilometerToMeter(staticDistance)} m</p>
      <p>{vicinity}</p>
    </div>
  );
}

export default NearCafeDets;
