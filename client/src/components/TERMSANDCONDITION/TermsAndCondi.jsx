import React from "react";
import TnC from "./TnC";

function TermsAndCondi() {
  return (
    <section className="container">
      <div className="footer-page-header">
        <h1>Smarfee</h1>
        <h1>Terms and Condition</h1>
      </div>
      <div className="terms-content">
        <p>
          Welcome to Smarfee! These Terms and Conditions govern your use of our
          website and services. By accessing or using Smarfee, you agree to
          comply with these terms. Please read them carefully before using our
          platform.
        </p>
        {TnC.map((i, index) => {
          return (
            <div key={index} className="privacy-item">
              <h1>
                {index + 1}. {i.TermsAndCondition}:
              </h1>
              <p>{i.Details}</p>
            </div>
          );
        })}
        <h3>
          These Terms and Conditions constitute the entire agreement between you
          and Smarfee regarding your use of the platform and supersede any prior
          agreements. If any provision of these Terms is deemed invalid, the
          remaining provisions shall remain in full force and effect. If you
          have any questions or concerns about these Terms and Conditions,
          please contact us at smarfee.cafeteria@gmail.com.
        </h3>
      </div>
    </section>
  );
}

export default TermsAndCondi;
