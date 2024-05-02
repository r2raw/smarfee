import React from "react";
import { Link, useOutletContext } from "react-router-dom";
import dayjs from "dayjs";
function NewStore() {
  const { stores } = useOutletContext();
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>Store</th>
            <th>Date Approved</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {stores
            .filter((i) => i.approvalstatus === "Approved")
            .map((store, index) => {
              return (
                <tr key={index}>
                  <td>{store.store_id}</td>
                  <td>{store.store_name}</td>
                  <td>{dayjs(store.dateapproved).format("MMMM DD, YYYY")}</td>
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
      <div className="see-more">
        <Link to="/Admin/Stores">
          <p>See more...</p>
        </Link>
      </div>
    </div>
  );
}

export default NewStore;
