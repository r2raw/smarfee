import React, { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import Loader from "./Loader/Loader";
import _ from "lodash";
import { titleCase } from "title-case";

function ViewSearchProduct() {
  const { backendData, handleOrders } = useOutletContext();
  const [viewedProducts, setViewedProducts] = useState();
  const { productCode } = useParams();
  useEffect(() => {
    const findProducts = backendData.products.find(
      (i) => i.productcode === productCode
    );

    if (findProducts) {
      setViewedProducts(findProducts);
    }
  }, [productCode]);

  const handleClick = ()=>{
    const order = {menu:viewedProducts}
    handleOrders(order)
  }
  if (!viewedProducts) return <Loader />;
  return (
    <div className="container view-search-product">
      <div>
        <img
          src={`https://smarfee.vercel.app/storeProducts/${viewedProducts.productimg}`}
          alt="prodimg"
        />
      </div>
      <div>
        <h1>
          Product name: {titleCase(_.lowerCase(viewedProducts.productname))}
        </h1>
        <h2>Store: {titleCase(_.lowerCase(viewedProducts.name))}</h2>
        <h3>Price: {viewedProducts.productprice}</h3>
        <p>Size: {viewedProducts.size}</p>
        <p>Type: {viewedProducts.type}</p>
        <p>Category: {viewedProducts.category}</p>
        <p>Product code: {viewedProducts.productcode}</p>
        <button onClick={handleClick} style={{width: "100%"}} className="primary solid fade">Add to plate</button>
      </div>
    </div>
  );
}

export default ViewSearchProduct;
