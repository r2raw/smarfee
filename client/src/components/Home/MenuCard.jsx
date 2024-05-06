import React from "react";

import vouch1 from "../my-images/vouchers/voucher1.png";
function MenuCard(props) {
  const { name, productname, productprice } = props.menu;
  console.log(props.menu)
  const url = `http://localhost:5000/storeProducts/${props.menu.productimg}`
  return (
    <div className="menu card">
      <div className="menu img">
        <img src={url} alt="menu1"></img>
      </div>
      <div className="menu details">
        <p>{name}</p>
        <h3>{productname}</h3>
        <h3>{productprice}</h3>
      </div>
    </div>
  );
}

export default MenuCard;
