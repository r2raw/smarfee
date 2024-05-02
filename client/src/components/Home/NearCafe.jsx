import React, { useEffect, useState } from "react";

// import img1 from "../my-images/vouchers/voucher1.png";s

import {
  Map,
  APIProvider,
  useMap,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";
import { Route } from "react-router-dom";
import NearCafeDets from "./NearCafeDets";
const google = window.google;

function NearCafe(props) {
  const { geometry } = props.store;

  // const { lat, lon } = props.geoInfo;

  // const center = {
  //   lat:14.6999457,
  //   lng:121.0336896,  
  // };
  const center = {
    lat:14.6909575,
    lng:121.0890238,  
  };
  const cafeCenter = {
    lat: geometry.location.lat,
    lng: geometry.location.lng,
  };

  // if (!props.geoInfo) return null;

  // console.log(props.geoInfo);
  // const center = {
  //   lat: lat,
  //   lng: lon,
  // };

  return (
    <div className="near-cafe">
      <div className="img-container map">
        <APIProvider apiKey={process.env.REACT_APP_MY_GOOGLE_MAPS_APIKEY}>
          <Map
            zoomControl={false}
            fullscreenControl={false}
            mapTypeControl={false}
            streetViewControl={false}
          >
            <Directions center={center} cafeCenter={cafeCenter} />
          </Map>
        </APIProvider>
      </div>
      <NearCafeDets store={props.store} />
    </div>
  );
}

export default NearCafe;

function Directions({ center, cafeCenter }) {
  const map = useMap();
  const routesLibrary = useMapsLibrary("routes");
  const [directionsService, setDirectionsService] = useState();
  const [directionsRenderer, setDirectionsRenderer] = useState();
  const [routes, setRoutes] = useState([]);

  const [routeIndex, setRouteIndex] = useState(0);
  const selected = routes[routeIndex];
  const leg = selected?.legs[0];

  useEffect(() => {
    if (!routesLibrary || !map) return;

    const directionService = new routesLibrary.DirectionsService();
    setDirectionsService(directionService);

    const directionRenderer = new routesLibrary.DirectionsRenderer({ map });
    setDirectionsRenderer(directionRenderer);
  }, [routesLibrary, map]);

  useEffect(() => {
    if (!directionsService || !directionsRenderer) return;

    directionsService
      .route({
        origin: center,
        destination: cafeCenter,
        travelMode: routesLibrary.TravelMode.WALKING,
        provideRouteAlternatives: true,
      })
      .then((res) => {
        directionsRenderer.setDirections(res);
        setRoutes(res.routes);
      })
      .catch((error) => {
        console.error("Error fetching directions:", error);
      });
  }, [directionsService, directionsRenderer, center, cafeCenter]);

  useEffect(() => {
    if (!directionsRenderer) return;
    directionsRenderer.setRouteIndex(routeIndex);
  }, [routeIndex, directionsRenderer]);

  const [display, setDisplay] = useState(false);
  if (!leg) return null;

  return (
    <div
      className="directions"
      onMouseLeave={() => {
        setDisplay(false);
      }}
      onMouseOver={() => {
        setDisplay(true);
      }}
    >
      <p>Route details:</p>
      {display && (
        <div>
          <p>Direction</p>
          <p>
            {leg.start_address.split(",")[0]} - {leg.end_address.split(",")[0]}
          </p>
          <p>All routes:</p>
          {routes.map((route, index) => {
            return (
              <p className="routes" onClick={() => setRouteIndex(index)}>
                {route.summary.split("/")[0]}
              </p>
            );
          })}
        </div>
      )}
    </div>
  );
}
