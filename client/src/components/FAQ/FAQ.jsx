import React from "react";
import Faqs from "./Faqs";

function FAQ() {
  return (
    <section className="container">
      <div className="footer-page-header">
        <h1>Smarfee</h1>
        <h1>FAQ</h1>
      </div>
      <div className="faq-content">
        {Faqs.map((i, index) => {
          return (
            <div key={index} className="faq-item">
              <h1>
                {i.no}. {i.question}
              </h1>
              <p>{i.answer}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default FAQ;
