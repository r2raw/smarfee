import React from 'react'
import {useOutletContext}  from "react-router-dom";
import PeopleAltSharpIcon from "@mui/icons-material/PeopleAltSharp";
import StoreMallDirectorySharpIcon from "@mui/icons-material/StoreMallDirectorySharp";
import RestaurantSharpIcon from "@mui/icons-material/RestaurantSharp";
function AdminDashboardAnalytics() {

  const {users, stores, availableProducts} = useOutletContext();
  
  const activatedUsers = users.filter(user => user.status === "Activated")
  return (
    <div className="analytics">
      <div className="card">
        <div>
          <h2>Users</h2>
          <h1>{activatedUsers.length}</h1>
        </div>
        <div className="icon">
          <PeopleAltSharpIcon />
        </div>
      </div>
      <div className="card">
        <div>
          <h2>Stores</h2>
          <h1>{stores.filter(i => i.approvalstatus === "Approved").length}</h1>
        </div>
        <div className="icon">
          <StoreMallDirectorySharpIcon />
        </div>
      </div>
      <div className="card">
        <div>
          <h2>Products</h2>
          <h1>{availableProducts.length}</h1>
        </div>
        <div className="icon">
          <RestaurantSharpIcon />
        </div>
      </div>
    </div>
  )
}

export default AdminDashboardAnalytics