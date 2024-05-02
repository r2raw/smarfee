import React, {useEffect, useState, useRef} from "react";
import { Link, useNavigate } from "react-router-dom";

function AdminLayoutHeader() {
  const img1 = require("../my-images/vouchers/voucher2.png");

  const navigate = useNavigate();
  const [viewUser, setViewUser] = useState(false);

  const menuRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setViewUser(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClick = ()=>{
    localStorage.setItem("accessToken", "");
    localStorage.setItem("uid", "");
    localStorage.setItem("role", "");
    navigate("/");
  }
  return (
    <header className="admin-header">
      <Link to="/Admin/Dashboard">
        <h1>SMARFEE</h1>
      </Link>
      <div className="account dropdown">
        <p>Hello, Arturo</p>
        <div
          className="user-image"
          onClick={() => setViewUser(!viewUser)}
          ref={menuRef}
        >
          <img src={img1} alt="user-image" />
          {viewUser && (
            <div>
              <Link to="/Vendor/Account">Account</Link>
              <p onClick={handleClick}>Logout</p>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default AdminLayoutHeader;
