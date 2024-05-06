import React, { useEffect, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import formatDate from "../MyFunctions/EighteenYearsAgo";
import dayjs from "dayjs";
import { set } from "lodash";
function AccountFormTwo(props) {
  const { userData } = props;
  const [disabled, setDisabled] = useState(true);
  const [errors, setErrors] = useState({
    phone: "",
    email: "",
  });
  const [values, setValues] = useState({
    firstname: userData.firstname,
    lastname: userData.lastname,
    email: userData.email,
    phone: userData.phone,
    sex: userData.sex,
    birthdate: userData.birthdate,
  });
  const handleInputChange = (e) => {
    const { value, name } = e.target;

    if (name === "phone" || name === "email") {
      if (e.target.validity.valid) {
        setErrors((prev) => ({
          ...prev,
          [name]: "",
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          [name]: "Invalid format!",
        }));
      }
    }
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleDateChange = (date) => {
    const newDate = dayjs(date).format("YYYY-MM-DD");
    const e = { target: { value: newDate, name: "birthdate" } };

    handleInputChange(e);
  };

  useEffect(()=>{
    let valid = true;

    for(const fieldname in values){
      if(!values[fieldname]){
        valid = false;
      }
    }

    for (const error in errors){
      if(errors[error] !== ""){
        valid = false;
      }
    }

    setDisabled(!valid);
  },[values, errors])
  return (
    <form>
      <div className="input-group">
        <input
          type="text"
          placeholder=" "
          value={values.firstname}
          name="firstname"
          onChange={handleInputChange}
          required
        />
        <span className="floating-label">First name</span>
      </div>
      <div className="input-group">
        <input
          type="text"
          placeholder=" "
          value={values.lastname}
          name="lastname"
          onChange={handleInputChange}
          required
        />
        <span className="floating-label">Last name</span>
      </div>
      <div className="input-group">
        <input
          className="br-4"
          type="email"
          name="email"
          placeholder=" "
          value={values.email}
          onChange={handleInputChange}
          required
        />
        <span className="floating-label">Email</span>
      </div>
      {errors.email !== '' && <p className="invalid">{errors.email}</p>}
      <p>Sex</p>
      <div className="radio-container">
        <input
          type="radio"
          id="rdbmale"
          name="sex"
          onChange={handleInputChange}
          value="Male"
          checked={values.sex === "Male"}
        />
        <label htmlFor="rdbmale">Male</label>
        <input
          type="radio"
          id="rdbfemale"
          name="sex"
          value="Female"
          onChange={handleInputChange}
          checked={values.sex === "Female"}
        />
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
          name="phone"
          onChange={handleInputChange}
          placeholder=" "
          value={values.phone}
          required
        />
      </div>
      {errors.phone !== '' && <p className="invalid">{errors.phone}</p>}
      <p>Birthdate:</p>
      <div className="birthdate-container">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            maxDate={dayjs().subtract(18, "year")}
            minDate={dayjs().subtract(100, "year")}
            inputProps={{ readOnly: true }}
            onChange={handleDateChange}
          />
        </LocalizationProvider>
      </div>

      <button className="solid tertiary fade" disabled={disabled}>Submit</button>
    </form>
  );
}

export default AccountFormTwo;
