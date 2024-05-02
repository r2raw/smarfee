import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";
import MenuSharpIcon from "@mui/icons-material/MenuSharp";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import LoginForm from "../Header/LoginForm";
function DeactivatedHeader() {
    const navigate = useNavigate()
  const [uIconDD, setUIconDD] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [loginForm, setLoginForm] = useState(true);
  const [uid, setUid] = useState("");
  const [role, setRole] = useState();
  const [navOpen, setNavOpen] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const { user } = useParams();

  useEffect(() => {
    fetchAccessToken();
  }, []);
  const fetchAccessToken = () => {
    const storedAccessToken = localStorage.getItem("accessToken");
    const getUid = localStorage.getItem("uid");
    if (getUid) {
      setUid(getUid);
    }
    if (storedAccessToken) {
      setAccessToken(storedAccessToken);
    }
  };

  const handleLogout = () => {
    localStorage.setItem("accessToken", "");
    localStorage.setItem("uid", "");
    localStorage.setItem("role", "");
    setUid("");
    setAccessToken("");
    navigate("/")
  };
  return (
    <header className="client-header">
      <Link to={`/Deactivated/${user}`}>
        <h1>SMARFEE</h1>
      </Link>

      <ul className="client nav-links">
        <li>
          <div
            className="user-icon"
            onClick={() => {
              if (uid) {
                setUIconDD(!uIconDD);
                return;
              }
            }}
          >
            <AccountCircleSharpIcon sx={{ fontSize: 40 }} />
            {uIconDD && (
              <div className="user-icon-modal">
                <p onClick={handleLogout}>Logout</p>
              </div>
            )}
          </div>
        </li>
      </ul>

      <div className="menu-icon" onClick={() => setNavOpen(!navOpen)}>
        {navOpen ? (
          <CloseSharpIcon sx={{ fontSize: 40 }} />
        ) : (
          <MenuSharpIcon sx={{ fontSize: 40 }} />
        )}
      </div>
      <div className={`nav-items ${navOpen && `open`}`}>
        <h1>SMARFEE</h1>
        <ul className="nav-links">
          <li>
            <AccountCircleSharpIcon sx={{ fontSize: 40 }} />
            <h1>Login</h1>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default DeactivatedHeader;
