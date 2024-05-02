import React, { useEffect } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { TextField } from "@mui/material";
import formatDate from "../MyFunctions/EighteenYearsAgo";
import dayjs from "dayjs";
function ThirdSection(props) {
  const { handleDataChange, formData, error } = props;
  var eighteenYearsAgo = new Date();
  eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);
  const formattedDateEighteen = formatDate(eighteenYearsAgo);

  const handleInputChange = (e) => {
    console.log(e.target);
    const { name, value } = e.target;
    let valid = e.target.validity.valid;

    if (name === "password" || name === "confirmPassword") {
      if (name === "password") {
        if (formData.confirmPassword?.value) {
          if (value === formData.confirmPassword.value) {
            handleDataChange(
              "confirmPassword",
              formData.confirmPassword.value,
              true
            );
          } else {
            handleDataChange(
              "confirmPassword",
              formData.confirmPassword.value,
              false
            );
          }
        }
      }

      if (name === "confirmPassword") {
        if (formData.password?.value) {
          if (value !== formData.password?.value) {
            valid = false;
          }
        }
      }
    }
    handleDataChange(name, value, valid);
  };

  const handleDateChange = (e, name) => {
    const value = dayjs(e).format("YYYY-MM-DD");
    handleDataChange(name, value, true);
  };

  useEffect(() => {}, [
    formData.password.value,
    formData.confirmPassword.valid,
  ]);
  return (
    <div className="second-section reg-section">
      <h2>Vendor Details</h2>
      <div className="vendor-details">
        <div className="left">
          <div className="vendor-photo-capt">
            <div className="img-container">
              {props.capturedPhoto && <img src={props.capturedPhoto} alt="vendor-capture-photo" />}
            </div>
            <button onClick={(e)=>{e.preventDefault(); props.handleCaptureModal(true)}} className="solid tertiary fade">Capture Photo</button>
          </div>
          <div className="input-group">
            <input
              className="br-4"
              type="text"
              name="firstname"
              value={formData.firstname.value}
              placeholder=" "
              onChange={handleInputChange}
              required
            />
            <span className="floating-label">First name</span>
          </div>
          <div className="input-group">
            <input
              className="br-4"
              type="text"
              name="lastname"
              placeholder=" "
              onChange={handleInputChange}
              value={formData.lastname.value}
              required
            />
            <span className="floating-label">Last name</span>
          </div>
          <div className="input-group">
            <input
              className="br-4"
              type="email"
              name="vendorEmail"
              value={formData.vendorEmail.value}
              placeholder=" "
              onChange={handleInputChange}
              required
            />
            <span className="floating-label">Email</span>
          </div>
          {error.vendorEmail && <p className="invalid">{error.vendorEmail}</p>}
          <p>Sex</p>
          <div className="radio-container">
            <input
              type="radio"
              id="rdbmale"
              name="sex"
              value="Male"
              onChange={handleInputChange}
            />
            <label htmlFor="rdbmale">Male</label>
            <input
              type="radio"
              id="rdbfemale"
              name="sex"
              value="Female"
              onChange={handleInputChange}
            />
            <label htmlFor="rdbfemale">Female</label>
          </div>
        </div>
        <div className="right">
          <div className="input-group">
            <input
              className="br-4"
              type="password"
              name="password"
              placeholder=" "
              value={formData.password.value}
              onChange={handleInputChange}
              required
            />
            <span className="floating-label">Password</span>
          </div>
          <div className="input-group">
            <input
              className="br-4"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword.value}
              placeholder=" "
              onChange={handleInputChange}
              style={
                formData.confirmPassword.value &&
                !formData.confirmPassword.valid
                  ? { color: "red", outline: "1px solid red", border: "none" }
                  : {}
              }
              required
            />
            <span
              className="floating-label"
              style={
                formData.confirmPassword.value &&
                !formData.confirmPassword.valid
                  ? { color: "red" }
                  : {}
              }
            >
              Confirm Password
            </span>
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
              value={formData.vendorPhone.value}
              onChange={handleInputChange}
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
                onChange={(e) => {
                  handleDateChange(e, "birthdate");
                }}
              />
            </LocalizationProvider>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThirdSection;
