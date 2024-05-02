import React from "react";
import img1 from "../../my-images/userImg/default.jpg";
function Discounts() {
  return (
    <div className="discounts card">
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
          <div className="img-container">
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
        <form>
          <div className="voucher-upload">
            <div className="img-container"></div>
            <label htmlFor="voucher-upload">Upload photo</label>
            <input
              type="file"
              accept="image/jpeg image/png"
              id="voucher-upload"
            />
          </div>
          <div>
            <div className="input-group">
                <input type="date" placeholder=" " />
                <span className='floating-label'>Start date</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Discounts;
