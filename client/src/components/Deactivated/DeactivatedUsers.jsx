import React from "react";
import { useParams } from "react-router-dom";

function DeactivatedUsers() {
    const {user} = useParams()
  return (
    <div>
      <h1>ACCOUNT DEACTIVATED : {user}</h1>
      <h3>
        Your account has been deactivated by the admin click the button to
        request an activation from the admin.
      </h3>
      <button className="tertiary solid fade">Request activation</button>
    </div>
  );
}

export default DeactivatedUsers;
