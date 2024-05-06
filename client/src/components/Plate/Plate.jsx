import React, { useState, useEffect } from "react";
import OrderedFoodRow from "./OrderedFoodRow";
import { useOutletContext } from "react-router-dom";
import ProceedOrder from "./ProceedOrder";
function Plate() {
  const [role, setRole] = useState();
  const [accessToken, setAccessToken] = useState("");
  const [success, setSuccess] = useState(false)
  const { orders, handleMinusOrders, handlePlusOrder, handleDeleteOrder, uid } =
    useOutletContext();
  const totalPrice = orders.reduce(
    (total, order) => total + parseFloat(order.computedPrice),
    0
  );

  useEffect(()=>{
    if(success){
      setTimeout(()=>{
        setSuccess(false)
      }, 3000)
    }
  },[success])
  const [proceedOrder, setProceedOrder] = useState(false);
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
                  return (
                    <OrderedFoodRow
                      key={index}
                      order={i}
                      handleMinusOrders={handleMinusOrders}
                      handlePlusOrder={handlePlusOrder}
                      handleDeleteOrder={handleDeleteOrder}
                    />
                  );
                })}
              </tbody>
            </table>
            <div className="order-total">
              <h1>Total: {totalPrice.toFixed(2)}</h1>
              <button
                className="primary solid fade"
                onClick={() => {
                  setProceedOrder(true);
                }}
                disabled={orders.length === 0 || uid === ""}
              >
                Proceed to order
              </button>
              {uid === "" && (
                <p className="invalid">Login first to proceed...</p>
              )}
            </div>
          </div>
        </div>
        {success && <p style={{width: '100%', textAlign: 'center', backgroundColor: '#8DECB4'}}>Order successful!</p>}
        
      </div>
      {proceedOrder && <ProceedOrder orders={orders} totalPrice={totalPrice} setProceedOrder={setProceedOrder} setSuccess={setSuccess} />}
      
    </section>
  );
}

export default Plate;
