import React, { useState, useEffect } from "react";
import Header from "./Header/Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer/Footer";
import axios from "axios";
import MainLoader from "./Loader/MainLoader";
function IndexLayout() {
  const [backendData, setBackendData] = useState();
  const [userData, setUserData] = useState();
  const [uid, setUid] = useState("");

  useEffect(() => {
    axios
      .get(`/display-product`)
      .then((res) => setBackendData(res.data))
      .catch((err) => console.error("display prod error: " + err.message));
  }, []);

  const fetchProduct = async () => {
    try {
      axios
        .get("/display-product")
        .then((res) => setBackendData(res.data))
        .catch((err) => console.error("display prod error: " + err.message));
    } catch (error) {
      console.error("fetchProductError: " + error.message);
    }
  };
  const fetchData = async () => {
    try {
      const response = await axios.get(`/user-info/${uid}`);
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  useEffect(() => {
    if (uid !== "") {
      fetchData();
    }else{
      setUserData(null);
    }
  }, [uid]);

  console.log(backendData); 
  const [orders, setOrder] = useState([]);

  const handleOrders = (order) => {
    const {
      name,
      productname,
      id,
      storeid,
      productcode,
      productprice,
      category,
      size,
    } = order.menu;

    const findOrderIndex = orders.findIndex(
      (order) => order.storeId === storeid && order.productCode === productcode
    );
    if (findOrderIndex !== -1) {
      setOrder((prevOrders) => {
        const updatedOrders = [...prevOrders];
        updatedOrders[findOrderIndex] = {
          ...updatedOrders[findOrderIndex],
          quantity: updatedOrders[findOrderIndex].quantity + 1,
          computedPrice:
            parseFloat(updatedOrders[findOrderIndex].computedPrice) +
            parseFloat(productprice),
        };
        return updatedOrders;
      });
    } else {
      setOrder((prevOrders) => [
        ...prevOrders,
        {
          storeName: name,
          productName: productname,
          price: productprice,
          category: category,
          size: size,
          computedPrice: productprice,
          quantity: 1,
          productId: id,
          storeId: storeid,
          productCode: productcode,
        },
      ]);
    }
  };

  const handleMinusOrders = (order) => {
    const { storeId, productCode } = order;

    const findOrderIndex = orders.findIndex(
      (order) => order.storeId === storeId && order.productCode === productCode
    );

    if (findOrderIndex !== -1) {
      setOrder((prevOrders) => {
        const updatedOrders = [...prevOrders];
        const updatedOrder = { ...updatedOrders[findOrderIndex] };
        if (updatedOrder.quantity > 1) {
          // If quantity is greater than 1, decrement quantity
          updatedOrder.quantity -= 1;
          // Adjust computed price
          updatedOrder.computedPrice -= parseFloat(updatedOrder.price);
          updatedOrders[findOrderIndex] = updatedOrder;
        } else {
          // If quantity is 1, remove the order from the array
          updatedOrders.splice(findOrderIndex, 1);
        }
        return updatedOrders;
      });
    }
  };

  const handlePlusOrder = (order) => {
    const { storeId, productCode } = order;
    const findOrderIndex = orders.findIndex(
      (order) => order.storeId === storeId && order.productCode === productCode
    );

    if (findOrderIndex !== -1) {
      setOrder((prevOrders) => {
        const updatedOrders = [...prevOrders];
        const updatedOrder = { ...updatedOrders[findOrderIndex] };
        updatedOrder.quantity += 1;
        updatedOrder.computedPrice =
          parseFloat(updatedOrder.computedPrice) +
          parseFloat(updatedOrder.price);
        updatedOrders[findOrderIndex] = updatedOrder;

        return updatedOrders;
      });
    }
  };

  const handleDeleteOrder = (order) => {
    const { storeId, productCode } = order;
    const findOrderIndex = orders.findIndex(
      (order) => order.storeId === storeId && order.productCode === productCode
    );

    if (findOrderIndex !== -1) {
      // Remove the order from the array
      setOrder((prevOrders) => {
        const updatedOrders = [...prevOrders];
        updatedOrders.splice(findOrderIndex, 1);
        return updatedOrders;
      });
    }
  };

  const handleClearOrder = () => {
    setOrder([]);
  };

  const getUid = (uid) => {
    setUid(uid);
  };
  if (!backendData) return <MainLoader />
  return (
    <div className="container">
      <Header order={orders} getUid={getUid} products={backendData.products} />
      <main>
        <Outlet
          context={{
            backendData,
            orders,
            handleOrders,
            handleMinusOrders,
            handlePlusOrder,
            handleDeleteOrder,
            uid,
            handleClearOrder,
            userData,
          }}
        />
      </main>
      <Footer />
    </div>
  );
}

export default IndexLayout;
