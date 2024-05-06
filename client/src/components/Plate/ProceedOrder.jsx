import React, { useState } from "react";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import { Zoom } from "@mui/material";
import axios from "axios";
import { useOutletContext } from "react-router-dom";
function ProceedOrder(props) {
  const { orders, totalPrice } = props;
  const { uid, handleClearOrder } = useOutletContext();
  const [serviceType, setServiceType] = useState("");
  const handleChange = (e) => {
    const { value } = e.target;

    setServiceType(value);
  };

  const handleConfirm = async () => {
    let items = [];

    for (let i = 0; i < orders.length; i++) {
      let order = {};
      for (const fieldName in orders[i]) {
        if (
          fieldName === "productId" ||
          fieldName === "storeId" ||
          fieldName === "quantity" ||
          fieldName === "computedPrice"
        ) {
          order = { ...order, [fieldName]: orders[i][fieldName] };
        }
      }
      items.push(order);
    }

    try {
      const response = await axios.post(`/Online-order/${uid}`, {
        items: items,
        service_type: serviceType,
      });

      if(response.data.status === 'success'){
        handleClearOrder();
        props.setSuccess(true)
        props.setProceedOrder(false)
      }
    } catch (error) {
      console.error("Online order error: " + error.message);
    }
  };
  return (
    <Zoom in={true}>
      <div className="proceed-order">
        <div className="order-confirmation">
          <div
            className="close-btn"
            onClick={() => {
              props.setProceedOrder(false);
            }}
          >
            <CloseSharpIcon />
          </div>
          <h3>Smarfee</h3>
          <div className="order-items">
            {orders.map((order, index) => {
              return (
                <div className="order-item">
                  <div>
                    <h5>{order.storeName}</h5>
                    <h4>{order.productName}</h4>
                    <h6>
                      {order.category} - {order.size}
                    </h6>
                  </div>
                  <h4>
                    {order.quantity}
                    {order.quantity > 1 ? "pcs." : "pc."}
                  </h4>
                  <h4>{parseFloat(order.computedPrice).toFixed(2)}</h4>
                </div>
              );
            })}
          </div>
          <div className="confirmation">
            <h3>Total: {parseFloat(totalPrice).toFixed(2)}</h3>
            <div className="rdbs">
              <input
                type="radio"
                value="Dine in"
                name="service-type"
                id="dine-in"
                onChange={handleChange}
              />
              <label htmlFor="dine-in">Dine in</label>
              <input
                type="radio"
                value="Take out"
                name="service-type"
                id="take-out"
                onChange={handleChange}
              />
              <label htmlFor="take-out">Take out</label>
            </div>
            <button
              className="solid primary fade"
              onClick={handleConfirm}
              disabled={serviceType === ""}
            >
              Proceed
            </button>
          </div>
        </div>
      </div>
    </Zoom>
  );
}

export default ProceedOrder;
