import React, { useEffect, useState } from "react";
import OrderedFood from "./OrderedFood";
import EnterAmount from "./EnterAmount";
function Cart(props) {
  const { orderedItems } = props;
  const [openAmount, setOpenAmount] = useState(false);
  const [total, setTotal] = useState();
  useEffect(() => {
    if (orderedItems) {
      setTotal(
        orderedItems.reduce(
          (prev, curr) => prev + parseFloat(curr.totalPrice),
          0
        )
      );
    }
  }, [orderedItems]);

  const handleAmountPayment = () => {
    setOpenAmount(!openAmount);
  };

  console.log(orderedItems.length)
  return (
    <div className="cart">
      <h1 style={{ textAlign: "center" }}>Order list</h1>
      <div className="order-list">
        {orderedItems &&
          orderedItems.map((i, index) => {
            return (
              <OrderedFood
                key={index}
                productName={i.productname}
                prodImg={i.productimg}
                id={i.id}
                qty={i.quantity}
                size={i.size}
                category={i.category}
                handlePlusOrder={props.handlePlusOrder}
                totalPrice={i.totalPrice}
                handleMinusOrder={props.handleMinusOrder}
              />
            );
          })}
      </div>
      <div className="summary">
        <p>Total: {total && total.toFixed(2)}</p>
        <div className="btns">
          <button
            onClick={() => {
              props.handleClearOrder();
            }}
            className="solid danger fade"
          >
            Clear
          </button>
          <button onClick={handleAmountPayment} disabled={orderedItems.length > 0 ? false : true} className="solid primary fade">
            Pay
          </button>
        </div>
      </div>
      {openAmount && <EnterAmount handleAmountPayment={handleAmountPayment} total={total} />}
    </div>
  );
}

export default Cart;
