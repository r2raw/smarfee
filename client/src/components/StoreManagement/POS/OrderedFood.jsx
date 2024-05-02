import React from "react";
import _ from "lodash";
import { titleCase } from "title-case";
import AddCircleSharpIcon from "@mui/icons-material/AddCircleSharp";
import RemoveCircleSharpIcon from "@mui/icons-material/RemoveCircleSharp";
function OrderedFood(props) {
  const { id, prodImg, qty, size, category, totalPrice , productName} = props;

  const handlePlusOrder = ()=>{
    props.handlePlusOrder(id)
  }

  const handleMinusOrder = ()=>{
    props.handleMinusOrder(id)
  }
  return (
    <div className="ordered-food">
      <div className="img-container">
        <img src={`http://localhost:5000/storeProducts/${prodImg}`} alt="asd" />
      </div>
      <div>
        <h3>{titleCase(_.toLower(productName))}</h3>
        <p>{size} - {category}</p>
        <div className="quantity">
          <div onClick={handleMinusOrder} className="qty-handler">
            <RemoveCircleSharpIcon />
          </div>
          <p>{qty}</p>
          <div onClick={handlePlusOrder} className="qty-handler">
            <AddCircleSharpIcon />
          </div>
        </div>
      </div>
      <div className="price">{totalPrice.toFixed(2)}</div>
    </div>
  );
}

export default OrderedFood;
