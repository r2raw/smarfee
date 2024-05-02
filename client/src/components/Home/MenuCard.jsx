import React from "react";

import vouch1 from "../my-images/vouchers/voucher1.png";
function MenuCard(props) {
  const { store, food, price } = props.menu;
  return (
    <div className="menu card">
      <div className="menu img">
        <img src={vouch1} alt="menu1"></img>
      </div>
      <div className="menu details">
        <p>{store}</p>
        <h3>{food}</h3>
        <h3>{price}</h3>
      </div>
    </div>
  );
}

export default MenuCard;
