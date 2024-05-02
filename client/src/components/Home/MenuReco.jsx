import React from "react";
import MenuCard from "./MenuCard";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import ArrowForwardSharpIcon from "@mui/icons-material/ArrowForwardSharp";
function MenuReco() {
  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 5,
    arrows: false,
    autoplay: true,
    dotsClass: "slick-dots slick-thumb",
    speed: 500,
    autoplaySpeed: 3000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1480,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        }
      },
      {
        breakpoint: 920,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      },
    ]

  };
  return (
    <div className="menu-reco">
      <Slider {...settings}>
        {sampleMenu.map((i, index) => {
          return (
            <div  key={index} className="slider-item">
              <MenuCard menu={i} />
            </div>
          );
        })}
        <div className="slider-item">
          <Link to="/Menu">
            <div className="menu card view-all">
              <div>
                <h1>View All</h1>
                <ArrowForwardSharpIcon />
              </div>
            </div>
          </Link>
        </div>
      </Slider>
    </div>
  );
}

export default MenuReco;

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
