import React, { useEffect, useState } from "react";
import POSRadios from "./POSRadios";
import { useOutletContext } from "react-router-dom";
import _ from "lodash";
import ProductItem from "./ProductItem";
function ProductList(props) {
  const [filteredProducts, setFilteredProducts] = useState();
  const [searchedProduct, setSearchedProduct] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const { availableProducts } = props;

  const handleSelectedCategory = (category) => {
    setSelectedCategory(category);
  };

  const handleSearch = (e) => {
    const { value } = e.target;

    setSearchedProduct(value);
  };

  useEffect(() => {
    if (searchedProduct === "" && selectedCategory === "") {
      setFilteredProducts(null);
      return;
    }
  
    if (searchedProduct !== "" && selectedCategory !== "") {
      const filteredAvailableProducts = availableProducts.filter(
        (product) =>
          _.toLower(product.productname).includes(_.toLower(searchedProduct)) &&
          product.category === selectedCategory
      );
      setFilteredProducts(filteredAvailableProducts);
      return;
    } else if (searchedProduct !== "") {
      const filteredAvailableProducts = availableProducts.filter(
        (product) => _.toLower(product.productname).includes(_.toLower(searchedProduct))
      );
      console.log(availableProducts)
      setFilteredProducts(filteredAvailableProducts);
      return;
    } else if (selectedCategory !== "") {
      const filteredAvailableProducts = availableProducts.filter(
        (product) => product.category === selectedCategory
      );
      setFilteredProducts(filteredAvailableProducts);
      return;
    }
  }, [searchedProduct, selectedCategory]);
  

  return (
    <div className="product-list">
      <div className="input-group">
        <input
          type="search"
          placeholder=" "
          className="card"
          onChange={handleSearch}
          value={searchedProduct}
          required
        />
        <span className="floating-label">Search</span>
      </div>
      <POSRadios
        handleSelectedCategory={handleSelectedCategory}
        selectedCategory={selectedCategory}
      />
      <div className="products">
        {!filteredProducts
          ? availableProducts.map((product, index) => {
              return (
                <ProductItem
                  key={index}
                  prodImg={product.productimg}
                  id={product.id}
                  name={product.productname}
                  price={product.productprice}
                  size={product.size}
                  addItem={props.addItem}
                />
              );
            })
          : filteredProducts.map((product, index) => {
              return (
                <ProductItem
                  key={index}
                  prodImg={product.productimg}
                  id={product.id}
                  name={product.productname}
                  price={product.productprice}
                  size={product.size}
                  addItem={props.addItem}
                />
              );
            })}
      </div>
    </div>
  );
}
export default ProductList;
