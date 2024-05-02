import React from "react";
import Vouchers from "./Vouchers";
import MenuReco from "./MenuReco";
import ForYou from "./ForrYou";
import NearestCafe from "./NearestCafe";
import shop from "../my-images/vouchers/shop.jpeg";
import { Link } from "react-router-dom";
function Home() {
  // const voucherBg = {
  //   backgroundImg: new URL(vouch3),
  // }
  return (
    <section className="container">
      <Vouchers />
      <section>
        <h1>Good Morning!</h1>
        <p>Start your day right with these delightful morning threats!</p>
        <MenuReco />
      </section>
      <section>
        <h1>Just for you</h1>
        <ForYou />
      </section>
      <section>
        <h1>Café near me</h1>
        <NearestCafe />
      </section>
      <section className="listing-section">
        <div className="shop img-container">
          {/* <img src={shop} alt="shop" /> */}
          <div className="listing">
            <div className="card">
              <h1>List your business on Smarfee</h1>
              <div className="paragraphs">
                <p>Ready to reach more customers? Let's make it happen!</p>
                <p>
                  With Smarfee, your menu shines online, orders flow
                  effortlessly.
                </p>
                <p>Excited to join forcs? Let'sdue in and grow together!</p>
              </div>
              <div className="btn-container">
                <Link to="/Register-Store">
                  <button className="tertiary solid">Get started</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}

export default Home;
