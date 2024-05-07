import React, { useState, useEffect } from "react";
import NearCafe from "./NearCafe";
import ArrowForwardSharpIcon from "@mui/icons-material/ArrowForwardSharp";
import axios from "axios";
function NearestCafe() {
  const [backendData, setBackendData] = useState();
  const [viewMore, setViewMore] = useState(false);

  const [ipAddress, setIpAddress] = useState();
  const [geoInfo, setGeoInfo] = useState();
  // const [nearestCafe, setNearestCafe] = useState();
  const toggleViewMore = () => {
    setViewMore(!viewMore);
  };
  useEffect(() => {
    axios
      .get("https://smarfee.vercel.app/api")
      .then((response) => {
        setBackendData(response.data);
      })
      .catch((error) => {});
  }, []);

  // useEffect(() => {
  //   getVisitorIp();
  // }, []);

  // const getVisitorIp = async () => {
  //   try {
  //     const response = await fetch(`https://api.ipify.org?format=json`);
  //     const data = await response.json();
  //     setIpAddress(data.ip);
  //   } catch (error) {
  //     console.error("Failed to fetch IP: " + error);
  //   }
  // };

  // useEffect(() => {
  //   fetchGeoInfo();
  // }, [ipAddress]);
  // const fetchGeoInfo = async () => {
  //   try {
  //     const response = await fetch(`http://ip-api.com/json/${ipAddress}`);
  //     const data = await response.json();
  //     setGeoInfo(data);
  //   } catch (error) {
  //     console.error("Failed to fetch IP info: " + error);
  //   }
  // };

  return (
    <div className="cafes">
      {!viewMore
        ? backendData &&
          backendData.nearbyCafe
            .sort((a, b) => a.distance - b.distance)
            .slice(0, 1)
            .map((i, index) => (
              <NearCafe key={index} store={i}/>
            ))
        : backendData &&
          backendData.nearbyCafe
            .sort((a, b) => a.distance - b.distance)
            .map((i, index) => (
              <NearCafe key={index} store={i} />
            ))}
      <button className="tertiary" onClick={toggleViewMore}>
        <p>{viewMore ? "Show less" : "View more"}</p> <ArrowForwardSharpIcon />
      </button>
    </div>
  );
}

export default NearestCafe;

const stores = [
  {
    store: "Juan Cafe",
    status: "Open",
    distance: "3 km",
    address:
      "Blas Roque subd Novaliches Brgy BagBag Quezon City, Metro-Manila, 1125",
  },
  {
    store: "BigBew",
    status: "Close",
    distance: "5 km",
    address:
      "Holy Cross Street Novaliches Brgy San Bartolome Quirino Highway Quezon City, Metro-Manila, 1125",
  },
  {
    store: "KapeChyno",
    status: "Open",
    distance: "12 km",
    address:
      "Blk #3 Lot 18 Kalayaan A St. Batasan Hills, Quezon City, Metro-Manila, 1126",
  },
];
