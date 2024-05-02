import React from "react";
import PnP from "./PnP";

function PrivacyPolicy() {
  return (
    <section className="container">
      <div className="footer-page-header">
        <h1>Smarfee</h1>
        <h1>Privacy Policy</h1>
      </div>
      <div className="privacy-content">
        <p>
          At Smarfee, we are committed to protecting the privacy and security of
          our users' personal information. This Privacy Policy outlines how we
          collect, use, disclose, and safeguard your data when you use our
          website or services.
        </p>
        {PnP.map((i, index) => {
          return (
            <div key={index} className="privacy-item">
              <h1>
                {i.no}. {i.what}
              </h1>
              {i.details.map((j, jIndex) => {
                return <p key={jIndex}>{j}</p>;
              })}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default PrivacyPolicy;
