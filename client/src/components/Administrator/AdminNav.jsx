import React, { useState } from "react";
import img1 from "../my-images/vouchers/shop.jpeg";
import DashboardSharpIcon from "@mui/icons-material/DashboardSharp";
import StorefrontSharpIcon from "@mui/icons-material/StorefrontSharp";
import InventorySharpIcon from "@mui/icons-material/InventorySharp";
import OutdoorGrillSharpIcon from "@mui/icons-material/OutdoorGrillSharp";
import PeopleAltSharpIcon from "@mui/icons-material/PeopleAltSharp";
import { Link, NavLink } from "react-router-dom";
import MenuSharpIcon from "@mui/icons-material/MenuSharp";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
function AdminNav() {
  const [open, setOpen] = useState(false);
  return (
    <aside className={`vendor-nav ${!open && `close`}`}>
      <div>
        <Link to="/Admin/Dashboard">
          <h2>ADMINISTRATOR</h2>
        </Link>
      </div>
      <div className="nav-list">
        <NavLink to="/Admin/Dashboard">
          <div className="item">
            <div className="nav-icon">
              <DashboardSharpIcon />
            </div>
            <h2 className="nav-text">Dashboard</h2>
          </div>
        </NavLink>
        <NavLink to="/Admin/Stores">
          <div className="item">
            <div className="nav-icon">
              <StorefrontSharpIcon />
            </div>
            <h2 className="nav-text">Store</h2>
          </div>
        </NavLink>
        <NavLink to="/Admin/Accounts">
          <div className="item">
            <div className="nav-icon">
              <PeopleAltSharpIcon />
            </div>
            <h2 className="nav-text" style={{ fontSize: "1.2rem" }}>
              Accounts
            </h2>
          </div>
        </NavLink>
        <NavLink to="/Admin/Store-Application">
          <div className="item">
            <div className="nav-icon">
              <InventorySharpIcon />
            </div>
            <h2 className="nav-text" style={{ fontSize: "1.2rem" }}>
              Store Application
            </h2>
          </div>
        </NavLink>
      </div>

      {open ? (
        <div className="menu-button" onClick={() => setOpen(false)}>
          <CloseSharpIcon sx={{ fontSize: 30 }} />
        </div>
      ) : (
        <div className="menu-button" onClick={() => setOpen(true)}>
          <MenuSharpIcon sx={{ fontSize: 30 }} />
        </div>
      )}
    </aside>
  );
}

export default AdminNav;
