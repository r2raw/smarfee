import React, { useState } from "react";
import img1 from "../my-images/vouchers/shop.jpeg";
import DashboardSharpIcon from "@mui/icons-material/DashboardSharp";
import StorefrontSharpIcon from "@mui/icons-material/StorefrontSharp";
import InventorySharpIcon from "@mui/icons-material/InventorySharp";
import OutdoorGrillSharpIcon from "@mui/icons-material/OutdoorGrillSharp";
import { NavLink } from "react-router-dom";
import MenuSharpIcon from "@mui/icons-material/MenuSharp";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import DiscountSharpIcon from '@mui/icons-material/DiscountSharp';
import AddShoppingCartSharpIcon from '@mui/icons-material/AddShoppingCartSharp';
function OwnerNav(props) {
  const [open, setOpen] = useState(false);
  
  if (props) return (
    <aside className={`vendor-nav ${!open && `close`}`}>
      <div>
        <div className="store-img">
          <img src={`http://localhost:5000/storeCredentials/${props.storeImage}`} alt="store-img" />
        </div>
        <h2>{props.storeName}</h2>
      </div>
      <div className="nav-list">
        <NavLink to="/Vendor/Dashboard">
          <div className="item">
            <div className="nav-icon">
              <DashboardSharpIcon />
            </div>
            <h2 className="nav-text">Dashboard</h2>
          </div>
        </NavLink>
        <NavLink to="/Vendor/Info">
          <div className="item">
            <div className="nav-icon">
              <StorefrontSharpIcon />
            </div>
            <h2 className="nav-text">Store</h2>
          </div>
        </NavLink>
        <NavLink to="/Vendor/Products">
          <div className="item">
            <div className="nav-icon">
              <InventorySharpIcon />
            </div>
            <h2 className="nav-text">Products</h2>
          </div>
        </NavLink>
        <NavLink to="/Vendor/Orders">
          <div className="item">
            <div className="nav-icon">
              <OutdoorGrillSharpIcon />
            </div>
            <h2 className="nav-text">Orders</h2>
          </div>
        </NavLink>
        <NavLink to="/Vendor/POS">
          <div className="item">
            <div className="nav-icon">
              <AddShoppingCartSharpIcon />
            </div>
            <h2 className="nav-text">POS</h2>
          </div>
        </NavLink>
        <NavLink to="/Vendor/Discounts">
          <div className="item">
            <div className="nav-icon">
              <DiscountSharpIcon />
            </div>
            <h2 className="nav-text">Discounts</h2>
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

export default OwnerNav;
