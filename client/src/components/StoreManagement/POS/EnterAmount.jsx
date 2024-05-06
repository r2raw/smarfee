import React, { useState } from "react";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import axios from "axios";
function EnterAmount(props) {
  const { total, orderedItems, serviceType } = props;
  const [amount, setAmount] = useState(0);
  const handleAmountChange = (e) => {
    const { value } = e.target;

    setAmount(value);
  };

  const handleKeyDown = (e) => {
    const { keyCode } = e;
    const inputValue = e.target.value;

    if (
      keyCode === 8 ||
      keyCode === 46 ||
      keyCode === 37 ||
      keyCode === 39 ||
      keyCode === 40 ||
      keyCode === 16
    ) {
      return;
    }
    if (inputValue !== "") {
      if (keyCode === 190 || keyCode === 110) {
        if (inputValue.includes(".")) {
          e.preventDefault();
        }
        return;
      }
    }

    if ((keyCode >= 48 && keyCode <= 57) || (keyCode >= 96 && keyCode <= 105)) {
      const decimalIndex = inputValue.indexOf(".");
      if (
        decimalIndex !== -1 &&
        inputValue.substring(decimalIndex + 1).length >= 2
      ) {
        e.preventDefault();
      }
      return;
    }

    e.preventDefault();
  };

  const handlePayment = async () => {
    // console.log(orderedItems)

    let items = [];
    for (let i = 0; i < orderedItems.length; i++) {
      let order = {};
      for (const fieldName in orderedItems[i]) {
        if (
          fieldName === "id" ||
          fieldName === "storeid" ||
          fieldName === "quantity" ||
          fieldName === "totalPrice"
        ) {
          order = { ...order, [fieldName]: orderedItems[i][fieldName] };
        }
      }
      items.push(order);
    }

    const change = parseFloat(amount - total).toFixed(2);
    const amountToPay = total;
    const enteredAmount = amount;

    try {
      const res = await axios.post("/POSPayment", {
        items: items,
        amountToPay: amountToPay,
        change: change,
        enteredAmount: enteredAmount,
        service_type: serviceType,
      });


      if(res.data.status === 'success'){
        props.handleAmountPayment(false)
        props.handleSuccesspayment();
      }
    } catch (error) {
      console.error("/POSPayment error: " + error.message);
    }
  };
  return (
    <div className="enter-amount">
      <div
        className="close-btn"
        onClick={() => {
          props.handleAmountPayment(false);
        }}
      >
        <CloseSharpIcon />
      </div>
      <div className="input-group">
        <input
          type="text"
          placeholder=" "
          onChange={handleAmountChange}
          onKeyDown={handleKeyDown}
          value={amount}
          required
        />
        <span className="floating-label">Enter Amount</span>
      </div>
      {amount >= total && (
        <p style={{ color: "green", alignSelf: "flex-start" }}>
          Change: {parseFloat(amount - total).toFixed(2)}
        </p>
      )}
      {amount < total && <p className="invalid">Invalid amount</p>}
      <button
        className="tertiary solid fade"
        onClick={handlePayment}
        disabled={amount < total ? true : false}
      >
        Confirm
      </button>
    </div>
  );
}

export default EnterAmount;
