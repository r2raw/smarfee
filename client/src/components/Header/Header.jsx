import React, { useState, useEffect } from "react";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import HomeSharpIcon from "@mui/icons-material/HomeSharp";
import MenuBookSharpIcon from "@mui/icons-material/MenuBookSharp";
import RestaurantMenuSharpIcon from "@mui/icons-material/RestaurantMenuSharp";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";
import MenuSharpIcon from "@mui/icons-material/MenuSharp";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import UserRegistration from "./UserRegistration";
import _ from "lodash"
import ProductSearch from "./ProductSearch";

function Header(props) {
  const [navOpen, setNavOpen] = useState(false);

  const navigate = useNavigate();
  const [viewModal, setViewModal] = useState(false);
  const [loginForm, setLoginForm] = useState(true);
  const location = useLocation();
  const [uid, setUid] = useState("");
  const [role, setRole] = useState();
  const [uIconDD, setUIconDD] = useState(false);
  const [search, setSearch] = useState()
  const [filteredProduct, setFilteredProducts] = useState();

  const [accessToken, setAccessToken] = useState("");
  useEffect(() => {
    const fetchAccessToken = () => {
      const storedAccessToken = localStorage.getItem("accessToken");
      const uid = localStorage.getItem("uid");
      const role = localStorage.getItem("role");
      
      if (uid) {
        setUid(uid);
      }
      if (storedAccessToken) {
        setAccessToken(storedAccessToken);
      }
      if(role){
        setRole(role)
      }
    };

    fetchAccessToken();
  }, []);

  const handleSuccessfulReg = () => {
    setLoginForm(true);
  };

  const handleLogin = ()=>{
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

    fetchAccessToken();
  }

  useEffect(()=>{
    if(role){
      if(role !== "Customer"){
        navigate(`${role}/Dashboard`)
      }
    }
  },[role])

  useEffect(()=>{
    props.getUid(uid)
  },[uid])
  const handleLogout = () => {
    localStorage.setItem("accessToken", "");
    localStorage.setItem("uid", "");
    localStorage.setItem("role", "");
    setUid("");
    setAccessToken("")
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleSearching = (e)=>{
    const search = e.target.value;
    setSearch(search)
  }
  
  useEffect(()=>{
    if(search !== ""){
      const filter = props.products.filter(i => _.lowerCase(i.productname) === _.lowerCase(search) || _.lowerCase(i.productname).includes(_.lowerCase(search)));
      console.log(filter)
      setFilteredProducts(filter)
      return;
    }
    setFilteredProducts("");
  },[search])

  console.log(props.products)
  return (
    <header className="client-header">
      <Link to="/">
        <h1>SMARFEE</h1>
      </Link>
      <div className="input-group search">
        <input type="search" className="primary" placeholder=" " onChange={handleSearching} value={search} />
        <span className="floating-label">Search</span>
        <span className="input-icon">
          <SearchSharpIcon />
        </span>
        {search && <ProductSearch products={filteredProduct} />}
      </div>
      <ul className="client nav-links">
        <li>
          <NavLink to="/">
            <HomeSharpIcon sx={{ fontSize: 40 }} />
          </NavLink>
        </li>
        <li>
          <NavLink to="Menu">
            <MenuBookSharpIcon sx={{ fontSize: 40 }} />
          </NavLink>
        </li>
        <li>
          <NavLink to="/Plate">
            <RestaurantMenuSharpIcon sx={{ fontSize: 40 }} />
              <div id="plate-number">{props.order.length}</div>
          </NavLink>
        </li>
        <li>
          <div
            className="user-icon"
            onClick={() => {
              if (uid) {
                setUIconDD(!uIconDD);
                return;
              }
              setViewModal(true);
            }}
          >
            <AccountCircleSharpIcon sx={{ fontSize: 40 }} />
            {uIconDD && (
              <div className="user-icon-modal">
                <p>Account</p>
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
            <NavLink to="/">
              <HomeSharpIcon sx={{ fontSize: 40 }} />
              <h1>Home</h1>
            </NavLink>
          </li>
          <li>
            <NavLink to="Menu">
              <MenuBookSharpIcon sx={{ fontSize: 40 }} />
              <h1>Menu</h1>
            </NavLink>
          </li>
          <li>
            <NavLink to="/Plate">
              <RestaurantMenuSharpIcon sx={{ fontSize: 40 }} />
              <h1>Plate</h1>
            </NavLink>
          </li>
          <li>
            <AccountCircleSharpIcon sx={{ fontSize: 40 }} />
            <h1>Login</h1>
          </li>
        </ul>
      </div>

      {!uid && (
        <div className={`modal ${viewModal && `open`}`}>
          <div className="login-form">
            <div
              className="btn-close"
              onClick={() => {
                setViewModal(false);
                setLoginForm(true);
              }}
            >
              <CloseSharpIcon />
            </div>
            <div className="form-container">
              {loginForm ? (
                <LoginForm handleLogin={handleLogin} />
              ) : (
                <UserRegistration handleSuccessfulReg={handleSuccessfulReg} />
              )}
              <p onClick={() => setLoginForm(!loginForm)}>
                {loginForm
                  ? `Doesn’t have an account?`
                  : `Already have an account?`}
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
