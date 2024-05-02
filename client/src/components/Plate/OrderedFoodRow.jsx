import React from "react";
import _ from "lodash";
import { titleCase } from "title-case";

import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import AddCircleSharpIcon from "@mui/icons-material/AddCircleSharp";
import RemoveCircleSharpIcon from "@mui/icons-material/RemoveCircleSharp";
function OrderedFoodRow(props) {
  const{storeName, productName, price, quantity} = props.order

  const handleMinusOrders = ()=>{
    props.handleMinusOrders(props.order)
  }

  const handlePlusOrder = ()=>{
    props.handlePlusOrder(props.order)
  }
  const handleDeleteOrder = ()=>{
    props.handleDeleteOrder(props.order)
  }
  return (
    <tr>
      <td>
        <div className="remove-icon icon" onClick={handleDeleteOrder}>
          <DeleteSharpIcon sx={{ fontSize: 40 }} />
        </div>
      </td>
      <td>
        <div className="quantity">
          <div className="icon" onClick={handlePlusOrder}>
            <AddCircleSharpIcon sx={{ fontSize: 40 }} />
          </div>
          <h1>{quantity}</h1>
          <div className="icon" onClick={handleMinusOrders}>
            <RemoveCircleSharpIcon  sx={{ fontSize: 40 }}  />
          </div>
        </div>
      </td>
      <td>
        <div>
          <h3>{titleCase(_.lowerCase(storeName))}</h3>
        </div>
        <div>
          <h3>{titleCase(_.lowerCase(productName))}</h3>
        </div>
      </td>
      <td>{(parseFloat(price) * parseFloat(quantity)).toFixed(2)}</td>
    </tr>
  );
}

export default OrderedFoodRow;
