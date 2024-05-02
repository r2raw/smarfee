import React, {useState, useEffect} from "react";
import _ from "lodash"
import { titleCase } from "title-case";
import axios from "axios";
import { useOutletContext } from "react-router-dom";
function AddToPlateCard(props) {
 
  const {handleOrders} = useOutletContext();

  const handleclick = ()=>{
    handleOrders(props);
    // axios.post("/place-order", props.menu).then(res =>{
      
    // }).catch(err => console.error("place-order error: " + err.message))
  }
  const { name, productname, productprice, productimg, size } = props.menu;
  return (
    <div className="menu card">
      <div className="item-img">
        <div className="outer">
          <div className="img-container">
            <img src={`http://localhost:5000/storeProducts/${productimg}`} alt="asd" />
          </div>
        </div>
      </div>
      <div className="details">
        <p>{titleCase(_.lowerCase(name))}</p>
        <h1>{titleCase(_.lowerCase(productname))}</h1>
        <h1>{productprice}</h1>
        <p>Size: {size}</p>
      </div>
      <div className="btn-container">
        <button className="primary appear" onClick={handleclick}>
          <p>Add to plate</p>
        </button>
      </div>
    </div>
  );
}

export default AddToPlateCard;
