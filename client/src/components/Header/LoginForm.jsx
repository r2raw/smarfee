import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginForm(props) {
  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
  });
  const [loggingIn, setLoggingIn] = useState(false);

  const [errorMessage, setErrorMessage] = useState();
  const navigate = useNavigate();
  function handleInputChange(e) {
    const { name, value } = e.target;

    setLoginInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  useEffect(() => {
    if (errorMessage) {
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  }, [errorMessage]);
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoggingIn(true);
    try {
      const response = await axios.post("https://smarfee.vercel.app/login", {
        email: loginInput.email,
        password: loginInput.password,
      });

      setLoggingIn(false);
      if (response.data.status === "success") {
        const accessToken = response.data.accessToken;
        const uid = response.data.uid;
        const role = response.data.role;
        const accStatus = response.data.accStatus;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("uid", uid);
        localStorage.setItem("role", role);
        localStorage.setItem("accStatus", accStatus);

        if(accStatus === "Deactivated"){
          navigate("/Deactivated/" + uid);
          return
        }
        if (role === "Admin") {
          navigate("/Admin/Dashboard");
        } else if (role === "Vendor") {
          navigate("/Vendor/Dashboard");
        } else {
          props.handleLogin();
        }
      } else {
        setErrorMessage(response.data.errmessage);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <form method="post" onSubmit={handleLogin}>
      {errorMessage && <p className="invalid">{errorMessage}</p>}
      <div>
        <div className="input-group">
          <input
            type="email"
            name="email"
            placeholder=" "
            onChange={handleInputChange}
            required
          />
          <span className="floating-label">Email</span>
        </div>
        <div className="input-group">
          <input
            type="password"
            name="password"
            placeholder=" "
            onChange={handleInputChange}
            required
          />
          <span className="floating-label">Password</span>
        </div>
        <button
          className="solid primary"
          formAction="/login"
          disabled={loggingIn}
        >
          {loggingIn ? "Logging in..." : "Login"}
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
