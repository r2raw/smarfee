import React from "react";
import img1 from "../../my-images/userImg/default.jpg";
import VoucherForm from "./VoucherForm";
function Discounts() {

  return (
    <div className="discounts">
      <h1>Discounts</h1>
      <div className="product-search">
        <div className="input-group">
          <input className="card" type="search" placeholder=" " required />
          <span className="floating-label">Search product code</span>
        </div>
        <button className="tertiary solid fade card">Search</button>
      </div>
      <div className="searched-product">
        <div className="product-info">
          <div className="img-container card">
            <img src={img1} alt="searched-product" />
          </div>
          <div>
            <h2>Product name: </h2>
            <h3>Product code: </h3>
            <h3>Price: </h3>
            <h3>Category: </h3>
            <h3>Size: </h3>
          </div>
        </div>
        <VoucherForm />
      </div>
    </div>
  );
}

export default Discounts;
