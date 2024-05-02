import React from "react";
import AdminDashboardAnalytics from "./AdminDashboardAnalytics";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import NewUser from "./NewUser";
import NewStore from "./NewStore";

function AdminDashboard() {
  return (
    <div className="admin dashboard">
      <h1>Dashboard</h1>
      <AdminDashboardAnalytics />
      <h1>New Users</h1>
      <NewUser  />
      <h1>New Stores</h1>
      <NewStore />
    </div>
  );
}

export default AdminDashboard;
