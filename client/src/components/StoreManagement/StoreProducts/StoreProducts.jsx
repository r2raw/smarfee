import React from "react";
import StoreProductsTable from "./StoreProductsTable";
import StoreAddOnsTable from "./StoreAddOnsTable";
import { useOutletContext } from "react-router-dom";

function StoreProducts() {
  const {backendData} = useOutletContext();
  return (
    <div className="stpre-products">
      <StoreProductsTable products={backendData.storeProducts} storeId={backendData.vendor.store_id} />
      {/* <StoreAddOnsTable /> */}
    </div>
  );
}

export default StoreProducts;
