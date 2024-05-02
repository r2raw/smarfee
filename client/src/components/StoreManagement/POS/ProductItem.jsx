import React from 'react'
import _ from "lodash"
import {titleCase} from "title-case"
import img1 from "../../my-images/userImg/default.jpg";
function ProductItem(props) {
    const handleAddItem = ()=>{
        props.addItem(props.id)
    }
  return (
    <div className="product-item card">
      <div className="img-container">
        <img src={`http://localhost:5000/storeProducts/${props.prodImg}`} alt="product-img" />
      </div>
      <div className="product-info">
        <h3>Product name: {titleCase(_.toLower(props.name))}</h3>
        <h4>Price: {props.price}</h4>
        <p>Size: {props.size}</p>
        <button className="tertiary solid fade" onClick={handleAddItem}>Add</button>
      </div>
    </div>
  )
}

export default ProductItem