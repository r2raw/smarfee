import React from "react";

import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import DeactivatedHeader from "./DeactivatedHeader";
function DeactivatedUserLayout() {
  return (
    <div className="container">
      <DeactivatedHeader />
      <main className="deactivated-user">
        <Outlet />
      </main>
    </div>
  );
}

export default DeactivatedUserLayout;
