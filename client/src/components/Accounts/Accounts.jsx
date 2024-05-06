import React, { useEffect, useState } from "react";
import AccountFormOne from "./AccountFormOne";
import AccountFormTwo from "./AccountFormTwo";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import MainLoader from "../Loader/MainLoader";

function Accounts() {
  const [loading, setLoading] = useState(false);
  const { userData } = useOutletContext();
  

  if (!userData) return <MainLoader />;
  return (
    <section className="container user-account">
      <AccountFormOne userData={userData.user_data} />
      <AccountFormTwo userData={userData.user_data} />
    </section>
  );
}

export default Accounts;
