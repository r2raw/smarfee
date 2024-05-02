import React from "react";
function ContactUs() {
  return (
    <section className="container">
      <div className="footer-page-header">
        <h1>Smarfee</h1>
        <h1>Contact Us</h1>
      </div>
      <div className="contact-content">
        <div>
          <div>
            <div className="input-group">
              <input
                className="br-4"
                type="text"
                name="store-name"
                placeholder=" "
                required
              />
              <span className="floating-label">First Name</span>
            </div>
            <div className="input-group">
              <input
                className="br-4"
                type="text"
                name="store-name"
                placeholder=" "
                required
              />
              <span className="floating-label">Last Name</span>
            </div>
          </div>
          <div className="input-group">
            <input
              className="br-4"
              type="email"
              name="store-name"
              placeholder=" "
              required
            />
            <span className="floating-label">Email</span>
          </div>
        </div>
        <div>
          <h3>Subject</h3>
          <select>
            <option value="">Choose an option</option>
            <option>Feedback and Suggestions</option>
            <option>Vendor Partnership Inquiry</option>
            <option>Account Assistance</option>
            <option>Technical Support</option>
            <option>Privacy & Security Concern</option>
          </select>
          <div className="input-group">
            <textarea placeholder=" " />
            <span className="floating-label">Your message.</span>
          </div>
        </div>

        <div className="checkbox-container" id="contact-check">
          <input type="checkbox" id="check-confirmation" />
          <label htmlFor="check-confirmation">
            I hereby declare that the information above is valid .
          </label>
        </div>
        <button className="solid primary">Send</button>
      </div>
    </section>
  );
}

export default ContactUs;
