import React from "react";
import OverTheCounterOrder from "./OverTheCounterOrder";
import { useOutletContext } from "react-router-dom";
import PendingOnlineOrders from "./PendingOnlineOrders";
import CompletedOnlineOrders from "./CompletedOnlineOrders";

function StoreOrders() {
  const { backendData } = useOutletContext();
  return (
    <div>
      StoreOrders
      <PendingOnlineOrders orders={backendData.orders.filter(i => i.order_type==='Online' && i.status ==='Pending')} />
      <CompletedOnlineOrders orders={backendData.orders.filter(i => i.order_type==='Online' && i.status ==='Completed')}/>
      <OverTheCounterOrder orders={backendData.orders.filter(i => i.order_type==='Over the counter')} />
    </div>
  );
}

export default StoreOrders;
