import React, { useEffect, useState } from "react";
import ProductList from "./ProductList";
import { useOutletContext } from "react-router-dom";
import Cart from "./Cart";

function PointOfSale() {
  const [availableProducts, setAvailableProducts] = useState();
  const { backendData } = useOutletContext();
  const [orderedItems, setOrderedItems] = useState([]);
  useEffect(() => {
    const storeProducts = backendData.storeProducts.filter(
      (i) => i.availability === "Available"
    );
    setAvailableProducts(storeProducts);
  }, [backendData.storeProducts]);

  const addItem = (id) => {
    const findProduct = availableProducts.find((i) => i.id === id);

    const searchOrder = orderedItems.find((i) => i.id === id);
    if (!searchOrder) {
      setOrderedItems((prev) => [
        ...prev,
        {
          ...findProduct,
          quantity: 1,
          totalPrice: parseFloat(findProduct.productprice),
        },
      ]);
    } else {
      handlePlusOrder(id);
    }
  };

  const handlePlusOrder = (id) => {
    const findOrderIndex = orderedItems.findIndex((order) => order.id === id);

    if (findOrderIndex !== -1) {
      setOrderedItems((prevOrders) => {
        const updatedOrders = [...prevOrders];
        const updatedOrder = { ...updatedOrders[findOrderIndex] };
        updatedOrder.quantity += 1;
        updatedOrder.totalPrice += parseFloat(updatedOrder.productprice);
        updatedOrders[findOrderIndex] = updatedOrder;

        return updatedOrders;
      });
    }
  };

  const handleMinusOrder = (id) => {
    const findOrderIndex = orderedItems.findIndex((order) => order.id === id);

    if (findOrderIndex !== -1) {
      if (orderedItems[findOrderIndex].quantity > 1) {
        setOrderedItems((prevOrders) => {
          const updatedOrders = [...prevOrders];
          const updatedOrder = { ...updatedOrders[findOrderIndex] };
          updatedOrder.quantity -= 1;
          updatedOrder.totalPrice -= parseFloat(updatedOrder.productprice);
          updatedOrders[findOrderIndex] = updatedOrder;

          return updatedOrders;
        });
      }else{
        const updatedOrder = orderedItems.filter(i => i.id !== id)
        setOrderedItems(updatedOrder)
      }
    }
  };

  const handleClearOrder = ()=>{
    setOrderedItems([])
  }
  if (!availableProducts) return null;
  return (
    <div className="point-of-sale">
      <ProductList availableProducts={availableProducts} addItem={addItem} />
      <Cart
        orderedItems={orderedItems}
        handlePlusOrder={handlePlusOrder}
        handleMinusOrder={handleMinusOrder}
        handleClearOrder={handleClearOrder}
      />
    </div>
  );
}

export default PointOfSale;
