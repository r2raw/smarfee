import React, {useState, useEffect} from "react";
import OrderedFoodRow from "./OrderedFoodRow";
import { useOutletContext } from "react-router-dom";
function Plate() {
  const [role, setRole] = useState();
  const [accessToken, setAccessToken] = useState("");
  const {orders, handleMinusOrders, handlePlusOrder, handleDeleteOrder, uid} = useOutletContext()
  const totalPrice = orders.reduce((total, order) => total + parseFloat(order.computedPrice), 0);

  return (
    <section className="my-plate container">
      <div className="plate">
        <div className="header">
          <h1>My Plate</h1>
        </div>
        <div className="orders">
          <div className="ordered-food">
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>Qty</th>
                  <th>Info</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
              {orders.map((i, index) => {
                return <OrderedFoodRow key={index} order={i} handleMinusOrders={handleMinusOrders} handlePlusOrder={handlePlusOrder} handleDeleteOrder={handleDeleteOrder} />
              } )}
              </tbody>
            </table>
            <div className="order-total">
              <h1>Total: {totalPrice.toFixed(2)}</h1>
              <button className="primary solid fade" disabled={uid === "" ? true : false}>Proceed to order</button>
              {uid === "" && <p className="invalid">Login first to proceed...</p>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Plate;
