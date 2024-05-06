import React, { useEffect } from "react";
import AccountFormOne from "./AccountFormOne";
import AccountFormTwo from "./AccountFormTwo";

function Accounts() {
  return (
    <section className="container user-account">
      <AccountFormOne />
      <AccountFormTwo />
    </section>
  );
}

export default Accounts;
