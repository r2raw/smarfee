import React, { useEffect, useState } from "react";
import OrderedFood from "./OrderedFood";
import EnterAmount from "./EnterAmount";
function Cart(props) {
  const { orderedItems } = props;
  const [openAmount, setOpenAmount] = useState(false);

  const [success, setSuccess] = useState(false);
  const [serviceType, setServiceType] = useState("");
  const [total, setTotal] = useState();

  const handleCheckChange = (e) => {
    const { value } = e.target;

    setServiceType(value);
  };
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

  const handleAmountPayment = (result) => {
    setOpenAmount(result);
  };

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    }
  }, [success]);

  const handleSuccesspayment = () => {
    setSuccess(true);
    props.handleClearOrder();
  };

  console.log(orderedItems.length);
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
        {success && (
          <p
            style={{
              width: "100%",
              textAlign: "center",
              backgroundColor: "#8DECB4",
            }}
          >
            Payment successful
          </p>
        )}
        <p>Total: {total && total.toFixed(2)}</p>
        <div className="rdbtn">
          <input
            type="radio"
            name="service_type"
            value='Dine in'
            id="dine-in"
            onChange={handleCheckChange}
          />
          <label htmlFor="dine-in">Dine in</label>
          <input
            type="radio"
            name="service_type"
            value='Take out'
            id="take-out"
            onChange={handleCheckChange}
          />
          <label htmlFor="take-out">Take out</label>
        </div>
        <div className="btns">
          <button
            onClick={() => {
              props.handleClearOrder();
            }}
            className="solid danger fade"
          >
            Clear
          </button>
          <button
            onClick={() => {
              handleAmountPayment(true);
            }}
            disabled={serviceType === "" || orderedItems.length === 0}
            className="solid primary fade"
          >
            Pay
          </button>
        </div>
      </div>
      {openAmount && (
        <EnterAmount
          serviceType={serviceType}
          handleSuccesspayment={handleSuccesspayment}
          handleAmountPayment={handleAmountPayment}
          orderedItems={orderedItems}
          total={total}
        />
      )}
    </div>
  );
}

export default Cart;
