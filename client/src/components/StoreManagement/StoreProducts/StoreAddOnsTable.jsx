import React from "react";
import _ from "lodash"
import { titleCase } from "title-case";
import { Link, useOutletContext } from "react-router-dom";
function StoreAddOnsTable() {
  const { backendData } = useOutletContext();
  return (
    <div className="table-container">
      <div className="table-search">
        <h1>Add-ons Products</h1>
        <div className="input-group">
          <input type="text" placeholder=" " required />
          <span className="floating-label">Search</span>
        </div>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>Code</th>
              <th>Product</th>
              <th>Price</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {backendData.addOns.map((product, index) => {
              return (
                <tr key={index}>
                  <td>{product.productcode}</td>
                  <td>{titleCase(_.lowerCase(product.productname))}</td>
                  <td>{product.productprice}</td>
                  <td>{product.availability}</td>
                  <td>
                    <div>
                      <Link to={`/Vendor/Products/`}>
                        <button className="tertiary solid">View</button>
                      </Link>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Link to="Add-Addons">
          <button className="solid primary">Add Product</button>
        </Link>
      </div>
    </div>
  );
}

export default StoreAddOnsTable;
