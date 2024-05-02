import React from "react";
import { useParams } from "react-router-dom";

function DeactivateUser(props) {
    const {userId} = useParams()
  return (
    <div className="deactivate-modal">
      <div>
        <h3>Are you sure to deactivate user: {userId}?</h3>
        <div>
          <button onClick={()=>{props.handleConfirm()}} className="solid danger fade">Confirm</button>
          <button onClick={()=>{props.handleDeactivation()}} className="solid primary fade">Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default DeactivateUser;
