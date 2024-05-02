import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";

function AdminStroes() {
  const { stores } = useOutletContext();
  console.log(stores);
  const approvedStyle = {
    backgroundColor: "green",
    width: "fit-content",
    color: "white",
    paddingInline: "10px",
    borderRadius: "20px",
  };
  return (
    <div>
      <h1>Stores</h1>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Approval Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {stores.map((store, index) => {
              return (
                <tr key={index}>
                  <td>{store.store_id}</td>
                  <td>{store.store_name}</td>
                  <td>
                    <p
                      style={
                        store.approvalstatus === "Approved" ? approvedStyle : {}
                      }
                    >
                      {store.approvalstatus}
                    </p>
                  </td>
                  <td>
                    <div>
                      <button className="tertiary solid">View</button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminStroes;
