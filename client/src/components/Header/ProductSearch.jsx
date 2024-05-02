import React from "react";
import Loader from "../Loader/Loader";
import _ from "lodash";
import { titleCase } from "title-case";
import { Link, useNavigate } from "react-router-dom";
function ProductSearch(props) {
  const navigate = useNavigate();
  const { products } = props;

  if (!products) return <Loader />;
  // const handleClick = (product)=>{
  //   navigate(`../View/${product.productcode}`)
  // }
  return (
    <div id="search-item">
      {products.map((product, index) => {
        return (
          <Link to={`../View/${product.productcode}`}>
            <div >
              <div>
                <img
                  src={`http://localhost:5000/storeProducts/${product.productimg}`}
                />
              </div>
              <div>
                <h3>{titleCase(_.lowerCase(product.productname))}</h3>
                <p>Store: {titleCase(_.lowerCase(product.name))}</p>
                <p>Size: {product.size}</p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default ProductSearch;
