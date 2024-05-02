import React, { useState, useEffect, useRef } from "react";
import MenuCard from "../Home/MenuCard";
import AddToPlateCart from "./AddToPlateCard";
import AddToPlateCard from "./AddToPlateCard";
import { useOutletContext } from "react-router-dom";

function MenuList() {
  const [currentCategory, setCurrentCategory] = useState("featured");
  const { backendData } = useOutletContext();
  const featuredRef = useRef(null);
  const riceMealRef = useRef(null);
  const desertsRef = useRef(null);
  const pastasRef = useRef(null);
  const burgersRef = useRef(null);

  
  console.log(backendData);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentCategory(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    ); // Adjust threshold as per your requirement

    observer.observe(featuredRef.current);
    observer.observe(riceMealRef.current);
    observer.observe(desertsRef.current);
    observer.observe(pastasRef.current);
    observer.observe(burgersRef.current);

    return () => {
      observer.disconnect();
    };
  }, [currentCategory]);

  const handleRadioChange = (category, ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <section className="container menu-list">
      <div className="rdbtns">
        <input
          type="radio"
          name="category"
          id="rdbfeatured"
          className="menu-header"
          checked={currentCategory === "rdbfeatured"}
          onChange={() => handleRadioChange("featured", featuredRef)}
        />
        <label htmlFor="rdbfeatured">Featured</label>
        <input
          type="radio"
          name="category"
          id="rdbricemeal"
          className="menu-header"
          checked={currentCategory === "rdbricemeal"}
          onChange={() => handleRadioChange("ricemeal", riceMealRef)}
        />
        <label htmlFor="rdbricemeal">Rice Meal</label>
        <input
          type="radio"
          name="category"
          id="rdbd&d"
          className="menu-header"
          checked={currentCategory === "d&d"}
          onChange={() => handleRadioChange("d&d", desertsRef)}
        />
        <label htmlFor="rdbd&d">Deserts & Drinks</label>
        <input
          type="radio"
          name="category"
          id="rdbpastas"
          className="menu-header"
          checked={currentCategory === "pastas"}
          onChange={() => handleRadioChange("pastas", pastasRef)}
        />
        <label htmlFor="rdbpastas">Pastas</label>
        <input
          type="radio"
          name="category"
          id="rdbburgers"
          className="menu-header"
          checked={currentCategory === "burgers"}
          onChange={() => handleRadioChange("burgers", burgersRef)}
        />
        <label htmlFor="rdbburgers">Burgers & Fries</label>
      </div>
      <div ref={featuredRef} className="featured  list-container">
        <h1>Featured</h1>
        <div className="list">
          {backendData.products.slice(0, 5).map((product, index) => {
            return <AddToPlateCard key={index} menu={product} />;
          })}
        </div>
      </div>
      <div ref={riceMealRef} className="rice-meal  list-container">
        <h1>Rice Meal</h1>
        <div className="list">
          {backendData.products
            .filter((product) => product.category === "Rice Meal")
            .map((product, index) => {
              return <AddToPlateCard key={index} menu={product} />;
            })}
        </div>
      </div>
      <div ref={desertsRef} className="deserts  list-container">
        <h1>Deserts & Drinks</h1>
        <div className="list">
          {backendData.products
            .filter((product) => product.category === "Desserts & Drinks")
            .map((product, index) => {
              return <AddToPlateCard key={index} menu={product} />;
            })}
        </div>
      </div>
      <div ref={pastasRef} className="pastas  list-container">
        <h1>Pastas</h1>
        <div className="list">
          {backendData.products
            .filter((product) => product.category === "Pastas")
            .map((product, index) => {
              return <AddToPlateCard key={index} menu={product} />;
            })}
        </div>
      </div>
      <div ref={burgersRef} className="burgers  list-container">
        <h1>Burgers</h1>
        <div className="list">
          {backendData.products
            .filter((product) => product.category === "Burgers & Fries")
            .map((product, index) => {
              return <AddToPlateCard key={index} menu={product} />;
            })}
        </div>
      </div>
    </section>
  );
}

export default MenuList;

const sampleMenu = [
  {
    store: "7/11",
    food: "Hotdog",
    price: 37.5,
  },
  {
    store: "Ministop",
    food: "Chicken Teriyaki Rice",
    price: 65,
  },
  {
    store: "Jollibee",
    food: "Spaghetti with Chickenjoy",
    price: 120,
  },
  {
    store: "McDonald's",
    food: "Big Mac Meal",
    price: 99,
  },
  {
    store: "KFC",
    food: "Original Recipe Chicken",
    price: 89,
  },
  {
    store: "FamilyMart",
    food: "Onigiri",
    price: 55,
  },
  {
    store: "Lido",
    food: "Lechon Macau Rice",
    price: 85,
  },
  {
    store: "Greenwich",
    food: "Hawaiian Overload Pizza",
    price: 199,
  },
  {
    store: "Pizza Hut",
    food: "Supreme Pan Pizza",
    price: 249,
  },
  {
    store: "Chowking",
    food: "Chao Fan",
    price: 79,
  },
];
