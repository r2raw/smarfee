import React, { useState, useEffect } from "react";
import AdminLayoutHeader from "./AdminLayoutHeader";
import AdminNav from "./AdminNav";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import MainLoader from "../Loader/MainLoader";

function AdminLayout() {
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
      } else if (role === "Vendor") {
        navigate("/Vendor/Dashboard");
      }
    }
  }, [role]);

  useEffect(() => {
    if (accessToken) {
      axios
        .get(`/Admin/${uid}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          setBackendData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [accessToken]);

  const renewStores = () => {
    axios
      .get("/renewStores")
      .then((res) => {
        setBackendData((prev) => ({
          ...prev,
          stores: res.data.stores,
        }));
      })
      .catch((err) =>
        console.error("Error fetching renew stores:", err.message)
      );
  };

  const updateuUserAccount = ()=>{
    axios
      .get("/updateUsers")
      .then((res) => {
        setBackendData((prev) => ({
          ...prev,
          userInfo: res.data.userInfo,
        }));
      })
      .catch((err) =>
        console.error("Error fetching renew stores:", err.message)
      );
  }

  // setInterval(()=>{
  //   updateuUserAccount();
  //   renewStores();
  // }, 90000)
  if (!backendData) return <MainLoader />
  return (
    <article>
      <AdminLayoutHeader />
      <AdminNav />
      <main>
        <Outlet
          context={{
            stores: backendData.stores,
            users: backendData.userInfo,
            availableProducts: backendData.availableProducts,
            renewStores,
            updateuUserAccount,
          }}
        />
      </main>
    </article>
  );
}

export default AdminLayout;
