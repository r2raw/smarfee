import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import "./Styles/styles.css";
import IndexLayout from "./IndexLayout";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MenuList from "./Menu/MenuList";
import Plate from "./Plate/Plate";
import RegStore from "./RegStore/RegStore";
import FAQ from "./FAQ/FAQ";
import About from "./ABOUT/About";
import PrivacyPolicy from "./PrivacyPolicy/PrivacyPolicy";
import TermsAndCondi from "./TERMSANDCONDITION/TermsAndCondi";
import ContactUs from "./CONTACT/ContactUs";
import StoreLayout from "./StoreManagement/StoreLayout";
import OwnerDashboard from "./StoreManagement/Dashboard/OwnerDashboard";
import StoreInfo from "./StoreManagement/StoreInfo/StoreInfo";
import StoreProducts from "./StoreManagement/StoreProducts/StoreProducts";
import StoreOrders from "./StoreManagement/StoreOrders/StoreOrders";
import AdminLayout from "./Administrator/AdminLayout";
import StoreApplication from "./Administrator/StoreApplication/StoreApplication";
import AdminStroes from "./Administrator/AdminStoreList/AdminStroes";
import AdminDashboard from "./Administrator/AdminDashboard/AdminDashboard";
import ViewStoreApp from "./Administrator/StoreApplication/ViewStoreApp";
import AccountList from "./Administrator/AccountList/AccountList";
import ViewUser from "./Administrator/ViewUser/ViewUser";
import StoreAddProduct from "./StoreManagement/StoreProducts/StoreAddProduct";
import StoreAddAddons from "./StoreManagement/StoreProducts/StoreAddAddons";
import PdfViewer from "./Administrator/StoreApplication/PdfViewer";
import ViewProducts from "./StoreManagement/StoreProducts/ViewProducts";
import ViewSearchProduct from "./ViewSearchProduct";
import Accounts from "./Accounts/Accounts";
import DeactivatedUsers from "./Deactivated/DeactivatedUsers";
import DeactivatedHeader from "./Deactivated/DeactivatedHeader";
import DeactivatedUserLayout from "./Deactivated/DeactivatedUserLayout";
import PointOfSale from "./StoreManagement/POS/PointOfSale";
import Discounts from "./StoreManagement/Discounts/Discounts";

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route>

//     </Route>
//   )
// )
function App() {
  return (
    <Routes>
      <Route path="/" element={<IndexLayout />}>
        <Route index element={<Home />} />
        <Route path="View/:productCode" element={<ViewSearchProduct />} />
        <Route path="Menu" element={<MenuList />} />
        <Route path="Plate" element={<Plate />} />
        <Route path="Register-Store" element={<RegStore />} />
        <Route path="FAQ" element={<FAQ />} />
        <Route path="About" element={<About />} />
        <Route path="Account" element={<Accounts />} />
        <Route path="Privacy-Policy" element={<PrivacyPolicy />} />
        <Route path="Terms-And-Condition" element={<TermsAndCondi />} />
        <Route path="Contact" element={<ContactUs />} />
      </Route>

      <Route path="/Deactivated" element={<DeactivatedUserLayout />}>
        <Route path=":user" element={<DeactivatedUsers />}/>
      </Route>

      <Route path="/Vendor" element={<StoreLayout />}>
        <Route path="Dashboard" element={<OwnerDashboard />} />
        <Route path="Info" element={<StoreInfo />} />
        <Route path="Products" element={<StoreProducts />} />
        <Route path="Products/Add-Product" element={<StoreAddProduct />} />
        <Route path="Products/Add-Addons" element={<StoreAddAddons />} />
        <Route path="Products/View-Product/:code" element={<ViewProducts />} />
        <Route path="Orders" element={<StoreOrders />} />
        <Route path="POS" element={<PointOfSale />} />
        <Route path="Discounts" element={<Discounts />} />
      </Route>

      <Route path="/Admin" element={<AdminLayout />}>
        <Route path="Dashboard" element={<AdminDashboard />} />
        <Route path="Stores" element={<AdminStroes />} />
        <Route path="Store-Application" element={<StoreApplication />} />
        <Route path="Accounts" element={<AccountList />} />
        <Route path="Accounts/:userId" element={<ViewUser />} />
        <Route path="Store-Application/:store" element={<ViewStoreApp />} />
        <Route
          path="Store-Application/:store/ViewCredential/:type/:url"
          element={<PdfViewer />}
        />
      </Route>
    </Routes>
    // <RouterProvider router={router} />
  );
}

export default App;
