import React from "react";
import {useOutletContext, Link} from "react-router-dom"
import dayjs from "dayjs";

function StoreApplication() {

  const {stores} = useOutletContext();

  return (
    <div>
      <h1>Store Application</h1>
      <div className="table-container">
        <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Date created</th>
            <th>Action</th>
          </tr>
        </thead>
          <tbody>
            {stores.filter(i => i.approvalstatus === "Pending").map((store, index)=>{
              return(
                <tr key={index}>
                  <td>{store.store_id}</td>
                  <td>{store.store_name}</td>
                  <td>{dayjs(store.date_created).format("MMMM DD, YYYY")}</td>
                  <td>
                    <div>
                    <Link to={`/Admin/Store-Application/${store.store_id}`}>
                      <button className="tertiary solid">View</button></Link>
                    </div></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StoreApplication;
