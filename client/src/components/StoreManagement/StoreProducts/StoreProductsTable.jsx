import React from "react";
import { Link } from "react-router-dom";
import _ from "lodash";
import { titleCase } from "title-case";
function StoreProductsTable(props) {
  const { products } = props;
  return (
    <div className="table-container">
      <div className="table-search">
        <h1>Store Products</h1>
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
              <th>Category</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => {
              return (
                <tr key={index}>
                  <td>{product.productcode}</td>
                  <td>{titleCase(_.lowerCase(product.productname))}</td>
                  <td>{product.productprice}</td>
                  <td>{product.category}</td>
                  <td>{product.availability}</td>
                  <td>
                    <div>
                      <Link to={`/Vendor/Products/View-Product/${product.productcode}`}>
                        <button className="tertiary solid">View</button>
                      </Link>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Link to="Add-Product">
          <button className="solid primary">Add Product</button>
        </Link>
      </div>
    </div>
  );
}

export default StoreProductsTable;
