import React, { useState, useEffect } from "react";
import StoreLayoutHeader from "./StoreLayoutHeader";
import OwnerNav from "./OwnerNav";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import PendingFirstSection from "./Pending/PendingFirstSection";
import PendingSecondSection from "./Pending/PendingSecondSection";
import MainLoader from "../Loader/MainLoader";
import StoreProducts from "./StoreProducts/StoreProducts";
import Rejected from "./Rejected/Rejected";
function StoreLayout() {
  const [backendData, setBackendData] = useState();
  const [accessToken, setAccessToken] = useState(""); // State to store the access token
  const [uid, setUid] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    // Function to fetch access token from storage or context
    const fetchAccessToken = () => {
      const storedAccessToken = localStorage.getItem("accessToken");
      const uid = localStorage.getItem("uid");
      const role = localStorage.getItem("role");

      if (role) {
        setRole(role);
      }
      if (uid) {
        setUid(uid);
      }
      if (storedAccessToken) {
        setAccessToken(storedAccessToken); // Set access token in state
      }
    };

    fetchAccessToken(); // Fetch access token on component mount
  }, []);

  useEffect(() => {
    if (role) {
      if (role === "Customer") {
        navigate("/");
      } else if (role === "Admin") {
        navigate("/Admin/Dashboard");
      }
    }
  }, [role]);

  useEffect(() => {
    if (accessToken) {
      axios
        .get(`https://smarfee.vercel.app/Vendor/${uid}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          setBackendData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [accessToken]);

  const renewProduct = () => {
    axios
      .get(`https://smarfee.vercel.app/renewProduct/${backendData.vendor.store_id}`)
      .then((res) => {
        console.log(res.status);
        if (res.data.status === "success") {
          setBackendData((prev) => ({
            ...prev,
            storeProducts: res.data.storeProducts,
          }));
          return;
        }
      })
      .catch((err) => console.error("renew product error: " + err.message));
  };
  if (!backendData) return <MainLoader />;
  if (backendData.vendor.approval_status === "Pending")
    return (
      <article>
        <StoreLayoutHeader />
        <main className="store-pending">
          <div className="pending-message">
            <h1>
              <span style={{ fontWeight: 400 }}>
                Store Registration Status:{" "}
              </span>
              Pending
            </h1>
            Your store registration is pending approval while our team reviews
            the information provided. We'll notify you once approved. Thank you
            for partnering with us; we're excited to be part of your business!
          </div>
          <section className="container">
            <div className="reg-container">
              <div className="registration-header">
                <h1>Store Registration Form</h1>
              </div>
              <PendingFirstSection vendor={backendData.vendor} />
              <PendingSecondSection storeOpe={backendData.storeOpe} />
            </div>
            {/* <button type="submit" className="solid primary">
              Edit
            </button> */}
          </section>
        </main>
      </article>
    );

  if (backendData.vendor.approval_status === "Rejected") return <Rejected />;
  return (
    <article>
      <StoreLayoutHeader />
      <OwnerNav
        storeImage={backendData.vendor.storeimg}
        storeName={backendData.vendor.store_name}
      />
      <main>
        <Outlet context={{ backendData, renewProduct }} />
      </main>
    </article>
  );
}

export default StoreLayout;
