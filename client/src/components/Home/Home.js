import React, { useEffect, useState } from "react";
import Vouchers from "./Vouchers";
import MenuReco from "./MenuReco";
import ForYou from "./ForrYou";
import NearestCafe from "./NearestCafe";
import shop from "../my-images/vouchers/shop.jpeg";
import { Link, useOutlet, useOutletContext } from "react-router-dom";
import dayjs from "dayjs";
function Home() {
  const { backendData } = useOutletContext();
  const [timelyThreats, setTimelyThreats] = useState();
  const [message, setMessage] = useState();
  const currTime = dayjs(Date.now()).format("HH:mm");

  useEffect(() => {
    const currentTime = dayjs().format("HH:mm:ss");
    const morningTime = dayjs("1970-01-01t 04:00:00").format("HH:mm:ss");
    const afternoonTime = dayjs("1970-01-01t 12:00:00").format("HH:mm:ss");
    const eveningTime = dayjs("1970-01-01t 18:00:00").format("HH:mm:ss");

    if (currentTime >= morningTime && currTime <= afternoonTime) {
      setTimelyThreats(
        backendData.products.filter((i) => i.type === "Morning special")
      );
      setMessage("Good Morning!");
    } else if (currTime >= afternoonTime && currTime <= eveningTime) {
      setMessage("Good Afternoon!");
      setTimelyThreats(
        backendData.products.filter((i) => i.type === "Afternoon special")
      );
    } else if (currTime >= eveningTime || currTime < morningTime) {
      setTimelyThreats(
        backendData.products.filter((i) => i.type === "Evening special")
      );
      setMessage("Good Evening!");
    }
  }, []);

  console.log(timelyThreats);
  return (
    <section className="container">
      <Vouchers />
      {timelyThreats && (
        <section>
          <h1>{message}</h1>
          <p>Start your day right with these delightful morning threats!</p>
          <MenuReco timelyThreats={timelyThreats} />
        </section>
      )}
      <section>
        <h1>Just for you</h1>
        <ForYou />
      </section>
      <section>
        <h1>Café near me</h1>
        <NearestCafe />
      </section>
      <section className="listing-section">
        <div className="shop img-container">
          {/* <img src={shop} alt="shop" /> */}
          <div className="listing">
            <div className="card">
              <h1>List your business on Smarfee</h1>
              <div className="paragraphs">
                <p>Ready to reach more customers? Let's make it happen!</p>
                <p>
                  With Smarfee, your menu shines online, orders flow
                  effortlessly.
                </p>
                <p>Excited to join forcs? Let'sdue in and grow together!</p>
              </div>
              <div className="btn-container">
                <Link to="/Register-Store">
                  <button className="tertiary solid">Get started</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}

export default Home;
