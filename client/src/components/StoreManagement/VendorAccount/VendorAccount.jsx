
import React from "react";
import img1 from '../../my-images/userImg/default.jpg'
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import formatDate from "../MyFunctions/EighteenYearsAgo";

import dayjs from "dayjs";
function VendorAccount() {
  return (
    <section className="container user-account">
    <form>
      <div className="img-container card">
        <img src={img1} alt="asd"/>
      </div>
      <button className="blue solid fade">Save Photo</button>
      <button className="solid tertiary fade">Upload Photo</button>
    </form>
    <form>
      <div className="input-group">
        <input type="text" placeholder=" " required />
        <span className="floating-label">First name</span>
      </div>
      <div className="input-group">
        <input type="text" placeholder=" " required />
        <span className="floating-label">Last name</span>
      </div>
      <div className="input-group">
        <input
          className="br-4"
          type="email"
          name="vendorEmail"
          placeholder=" "
          required
        />
        <span className="floating-label">Email</span>
      </div>
      <p>Sex</p>
      <div className="radio-container">
        <input type="radio" id="rdbmale" name="sex" value="Male" />
        <label htmlFor="rdbmale">Male</label>
        <input type="radio" id="rdbfemale" name="sex" value="Female" />
        <label htmlFor="rdbfemale">Female</label>
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
          name="vendorPhone"
          placeholder=" "
          required
        />
      </div>
      <p>Birthdate:</p>
      <div className="birthdate-container">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            maxDate={dayjs().subtract(18, "year")}
            minDate={dayjs().subtract(100, "year")}
            inputProps={{ readOnly: true }}
          />
        </LocalizationProvider>
      </div>
      <button className="solid tertiary fade">Submit</button>
    </form>
    </section>
  )
}

export default VendorAccount