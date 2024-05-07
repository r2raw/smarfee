import React, { useEffect, useState } from "react";
import axios from "axios";
import userRegValidation from "./userRegValidation";
import CheckCircleOutlineSharpIcon from "@mui/icons-material/CheckCircleOutlineSharp";
import { border } from "@mui/system";
function UserRegistration(props) {
  const [isEnable, setIsEnable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    email: "",
    password: "",
    confirmpassword: "",
  });

  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const handlePassChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    setErrors(userRegValidation(values));
  }, [values]);

  useEffect(() => {
    const hasErrors = Object.values(errors).some((error) => error);
    setIsEnable(!hasErrors);
  }, [errors]);
  const handleSubmit = (e) => {
    e.preventDefault();

    // console.log(values);
    setLoading(true);
    const formData = new URLSearchParams();
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("confirmpassword", values.confirmpassword);
    axios
      .post("https://smarfee.vercel.app/registercustomer", formData)
      .then((res) => {
        setLoading(false);
        if (res.data.status === "success") {
          setSuccess(true);
        } else {
          setErrors((prev) => ({
            ...prev,
            email: res.data.message,
          }));
        }
      })
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSuccess(false);
        props.handleSuccessfulReg();
      }, 3000);
    }
  }, [success]);
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div className="input-group">
          <input
            type="email"
            name="email"
            onChange={handlePassChange}
            placeholder=" "
            required
          />
          <span className="floating-label">Email</span>
        </div>
        {values.email && errors.email && (
          <p className="invalid">{errors.email}</p>
        )}
        <div className="input-group">
          <input
            type="password"
            name="password"
            value={values.password}
            onChange={handlePassChange}
            placeholder=" "
            required
          />
          <span className="floating-label">Password</span>
        </div>
        {values.password && errors.password && (
          <p className="invalid">{errors.password}</p>
        )}
        <div className="input-group">
          <input
            type="password"
            style={
              values.confirmpassword && errors.confirmpassword
                ? invalidStyle
                : {}
            }
            name="confirmpassword"
            value={values.confirmpassword}
            onChange={handlePassChange}
            placeholder=" "
            required
            valid={false}
          />
          <span className="floating-label">Confirm Password</span>
        </div>
        {values.confirmpassword && errors.confirmpassword && (
          <p className="invalid">{errors.confirmpassword}</p>
        )}
        {loading ? (
          <button type="submit" className="solid primary" disabled={true}>
            Registering...
          </button>
        ) : (
          <button type="submit" className="solid primary" disabled={!isEnable}>
            Register
          </button>
        )}
      </div>

      {success && (
        <div className="modal open  register-user">
          <div className="result-message success">
            <div>
              <CheckCircleOutlineSharpIcon />
            </div>
            <h1>Success</h1>
          </div>
        </div>
      )}
    </form>
  );
}

export default UserRegistration;

const invalidStyle = {
  border: "1px solid red",
};
