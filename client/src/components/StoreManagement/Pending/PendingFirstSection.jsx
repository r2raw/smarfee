import React from "react";

function PendingFirstSection(props) {
    const {vendor} = props;
    const storeImg = `http://localhost:5000/storeCredentials/${vendor.storeimg}`
    const storeDti = `http://localhost:5000/storeCredentials/${vendor.dti}`
    const storeClearance = `http://localhost:5000/storeCredentials/${vendor.clearance}`
    const storePermit = `http://localhost:5000/storeCredentials/${vendor.permit}`
  return (
    <div className="first-section reg-section">
      <h2>Store Details</h2>
      <div className="section-grid">
        <div className="grid-item store-img">
          <div className="img-container">
            <img className="empl-img" src={storeImg} alt="store-img" />;
          </div>
        </div>
        <div className="grid-item">
          <div className="input-group">
            <input
              className="br-4"
              type="text"
              name="storeName"
              placeholder=" "
              value={vendor.store_name}
              disabled
            />
            <span className="floating-label">Store name</span>
          </div>
          <div className="input-group">
            <input
              className="br-4"
              type="email"
              name="email"
              placeholder=" "
              value={vendor.store_email}
              required
            />
            <span className="floating-label">Email</span>
          </div>

          <div className="store-contact">
            <p className="phone-number">
              Contact No. <span>+63</span>
            </p>
            <input
              className="br-4"
              type="tel"
              pattern="[9]{1}[0-9]{9}"
              maxLength={10}
              name="phone"
              value={vendor.store_phone}
              placeholder=" "
              disabled
            />
          </div>
        </div>
        <div className="grid-item">
          <div className="file-button-container">
            <p>DTI Registration: <a href={storeDti} target="_blank"> {vendor.dti} </a></p>
          </div>
          <div className="file-button-container">
            <p>Barangay Clearance: <a href={storeClearance} target="_blank"> {vendor.clearance} </a></p>
          </div>
          <div className="file-button-container">
            <p>Business Permit: <a href={storePermit} target="_blank"> {vendor.permit} </a></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PendingFirstSection;
