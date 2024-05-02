import React from "react";
import FacebookSharpIcon from "@mui/icons-material/FacebookSharp";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <footer>
      <h1>SMARFEE</h1>
      <div className="clickables">
        <Link to="FAQ">
          <p>FAQ</p>
        </Link>
        <Link to="Contact">
          <p>Contact us</p>
        </Link>
        <Link to="About">
          <p>About</p>
        </Link>
        <Link to="Terms-And-Condition">
          <p>Terms & Conditions</p>
        </Link>
        <Link to="Privacy-Policy">
          <p>Private Policy</p>
        </Link>
      </div>
      <div>
        <h3>For news and updates, follow us</h3>
        <div className="socials">
          <FacebookSharpIcon sx={{ fontSize: 60 }} />
          <InstagramIcon sx={{ fontSize: 60 }} />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
