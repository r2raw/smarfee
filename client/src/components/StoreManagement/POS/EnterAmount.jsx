import React, { useState } from "react";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
function EnterAmount(props) {
  const { total } = props;
  const [amount, setAmount] = useState(0);
  const handleAmountChange = (e)=>{
    const {value} = e.target;

    setAmount(value)

  }

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
  return (
    <div className="enter-amount">
      <div
        className="close-btn"
        onClick={() => {
          props.handleAmountPayment();
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
      {amount >= total && <p style={{color: "green", alignSelf: "flex-start"}}>Change: {parseFloat(amount - total).toFixed(2)}</p>}
      {amount < total && <p className="invalid">Invalid amount</p>}
      <button className="tertiary solid fade" disabled={amount < total ? true : false}>Confirm</button>
    </div>
  );
}

export default EnterAmount;
