import React from "react";
import { useOutletContext } from "react-router-dom";
import StoreOpe from "./StoreOpe";

function StoreInfo() {
  const { backendData } = useOutletContext();
  const { vendor, storeOpe } = backendData;
  return (
    <div>
      <h1>Store Details</h1>
      <div className="vendor-store-details">
        <form>
          <div>
            <div className="img-container">
              <img
                src={`http://localhost:5000/storeCredentials/${vendor.storeimg}`}
              />
              <input type="file" accept="image/png" id="store-image" />
              <label htmlFor="store-image">Upload Photo</label>
            </div>
            <div>
              <div className="input-group">
                <input type="text" placeholder=" " value={vendor.store_name} required />
                <span className="floating-label">Store name</span>
              </div>
              <div className="input-group">
                <input type="email" placeholder=" " value={vendor.store_email} required />
                <span className="floating-label">Email</span>
              </div>
              <div className="user-contact">
                <p>
                  Contact No. <span>+63</span>
                </p>
                <div className="input-group">
                  <input type="tel" placeholder=" " maxLength={10} value={vendor.store_phone} pattern="[9]{1}[0-9]{9}" required />
                </div>
              </div>
              <button className="button solid tertiary fade">Update</button>
            </div>
          </div>
          <StoreOpe  storeOpe={storeOpe}/>
        </form>
      </div>
    </div>
  );
}

export default StoreInfo;
