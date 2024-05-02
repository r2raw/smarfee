import React from "react";
import Slider from "react-slick";
import vouch1 from "../my-images/vouchers/voucher1.png";
import vouch2 from "../my-images/vouchers/voucher2.png";
function Vouchers() {
  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3, 
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0px',
    arrows: false,
    autoplay: true,
    dotsClass: "slick-dots slick-thumb",
    speed: 500,
    autoplaySpeed: 1500,
    cssEase: "linear",
  };
  return (
    <div className="vouchers card">
      <div className="coupons">
        <Slider {...settings}>
        {voucher.map((i, index) => {
          return (
            <div key={index} className="item">
              <img src={i.imgUrl} alt="vouch1" />
            </div>
          );
        })}</Slider>
      </div>
    </div>
  );
}

export default Vouchers;

const voucher = [
  {
    imgUrl: vouch1,
    title: "Voucher1",
  },
  {
    imgUrl: vouch2,
    title: "Voucher1",
  },
  {
    imgUrl: vouch1,
    title: "Voucher1",
  },
  {
    imgUrl: vouch2,
    title: "Voucher1",
  },
  {
    imgUrl: vouch1,
    title: "Voucher1",
  },
];
