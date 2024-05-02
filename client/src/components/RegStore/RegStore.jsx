import React, { useCallback, useEffect, useState } from "react";
import UploadSharpIcon from "@mui/icons-material/UploadSharp";
import FirstSection from "./FirstSection";
import SecondSection from "./SecondSection";
import ThirdSection from "./ThirdSection";
import io from "socket.io-client";
import axios from "axios";
import CheckCircleOutlineSharpIcon from "@mui/icons-material/CheckCircleOutlineSharp";
import ErrorOutlineSharpIcon from "@mui/icons-material/ErrorOutlineSharp";
import { useNavigate } from "react-router-dom";
import PhotoCapture from "./PhotoCapture";

function RegStore() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [infoValid, setInfoValid] = useState(false);
  const [operatingDays, setOperatingDays] = useState([]);
  const [success, setSuccess] = useState(false);
  const [sameTime, setSameTime] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [loadingSubmission, setLoadingSubmission] = useState(false);
  const [isCaptureOpen, setIsCaptureOpen] = useState(false);
  const [error, setError] = useState({
    storeName: "",
    email: "",
    vendorEmail: "",
  });
  const handlePhotoCapture = (captured) => {
    setCapturedPhoto(captured);
  };
  const [formData, setFormData] = useState({
    storeImg: { value: "", valid: "" },
    storeName: { value: "", valid: "" },
    email: { value: "", valid: "" },
    phone: { value: "", valid: "" },
    dti: { value: "", valid: "" },
    clearance: { value: "", valid: "" },
    permit: { value: "", valid: "" },
    weekdayOpening: { value: "", valid: "" },
    weekdayClosing: { value: "", valid: "" },
    weekendOpening: { value: "", valid: "" },
    weekendClosing: { value: "", valid: "" },
    firstname: { value: "", valid: "" },
    lastname: { value: "", valid: "" },
    vendorEmail: { value: "", valid: "" },
    sex: { value: "", valid: "" },
    password: { value: "", valid: "" },
    confirmPassword: { value: "", valid: "" },
    vendorPhone: { value: "", valid: "" },
    birthdate: { value: "", valid: "" },
  });

  const handleDataChange = (name, value, validity) => {
    setFormData((prev) => ({
      ...prev,
      [name]: { value: value, valid: validity },
    }));
  };

  const handleOperatingDay = (days) => {
    // console.log(days)
    setOperatingDays(days);
  };
  useEffect(() => {
    let allFieldsValid = true;
    if (
      !operatingDays.includes("Sunday") &&
      !operatingDays.includes("Saturday")
    ) {
      for (const fieldName in formData) {
        if (fieldName !== "weekendOpening" && fieldName !== "weekendClosing") {
          const field = formData[fieldName];
          if (field.value === "" || !field.valid) {
            allFieldsValid = false;
            break;
          }
        }
      }
    } else if (
      !operatingDays.includes("Monday") &&
      !operatingDays.includes("Tuesday") &&
      !operatingDays.includes("Wednesday") &&
      !operatingDays.includes("Thursday") &&
      !operatingDays.includes("Friday")
    ) {
      for (const fieldName in formData) {
        if (fieldName !== "weekdayOpening" && fieldName !== "weekdayClosing") {
          const field = formData[fieldName];
          if (field.value === "" || !field.valid) {
            allFieldsValid = false;
            break;
          }
        }
      }
    } else {
      for (const fieldName in formData) {
        const field = formData[fieldName];
        if (field.value === "" || !field.valid) {
          allFieldsValid = false;
          break;
        }
      }
    }

    setIsEnabled(allFieldsValid);
  }, [formData, operatingDays]);

  const handleCheckChange = (checked) => {
    setSameTime(checked);
  };

  const uploadStoreReg = useCallback((data) => {
    setLoadingSubmission(true);
    axios
      .post("/store-registration", data)
      .then((response) => {
        setLoadingSubmission(false);
        if (response.data.status === "success") {
          setSuccess(true);
        }
      })
      .catch((error) => console.error("Catched Error:", error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let newData = {};
    for (const fieldName in formData) {
      newData[fieldName] = formData[fieldName].value; // Assign value to corresponding fieldName in newData
    }

    axios
      .post("/validate-store-registration", newData)
      .then((res) => {
        if (res.data.status === "success") {
          let newData = new FormData(e.target);
          newData.append("operatingDetails", JSON.stringify(operatingDays));
          newData.append("birthdate", formData.birthdate.value);
          newData.append("vendorImg", capturedPhoto);
          uploadStoreReg(newData);
          return;
        }

        return setError(res.data.error);
      })
      .catch((err) => console.error("validate store error: " + err.message));
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (success) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [success]);

  const handleCaptureModal = (result) => {
    setIsCaptureOpen(result);
  };
  return (
    <section className="container store-registration">
      <form
        className="store-reg"
        encType="multipart/form-data"
        method="post"
        onSubmit={handleSubmit}
      >
        <div className="reg-container">
          <div className="registration-header">
            <h1>Store Registration Form</h1>
            <p>
              Join our community! Register your store now and let's grow
              together!
            </p>
          </div>
          <FirstSection
            error={error}
            handleDataChange={handleDataChange}
            formData={formData}
          />
          <SecondSection
            handleDataChange={handleDataChange}
            formData={formData}
            handleOperatingDay={handleOperatingDay}
            handleCheckChange={handleCheckChange}
          />
          <ThirdSection
            error={error}
            handleCaptureModal={handleCaptureModal}
            handleDataChange={handleDataChange}
            formData={formData}
            capturedPhoto={capturedPhoto}
          />
        </div>
        <div className="checkbox-container">
          <input
            type="checkbox"
            id="check-confimation"
            onChange={() => setInfoValid(!infoValid)}
          />
          <label htmlFor="check-confimation">
            I hereby declare that the information above is valid .
          </label>
        </div>
        <button
          type="submit"
          className="solid primary"
          disabled={
            !loadingSubmission &&
            operatingDays.length > 0 &&
            infoValid &&
            isEnabled
              ? false
              : true
          }
        >
          {loadingSubmission ? "Loading..." : "Register"}
        </button>

        {success && (
          <div className="modal open">
            <div className="result-message success">
              <div>
                <CheckCircleOutlineSharpIcon />
              </div>
              <h1>Success</h1>
            </div>
          </div>
        )}
      </form>
      {isCaptureOpen && (
        <PhotoCapture
          handlePhotoCapture={handlePhotoCapture}
          handleCaptureModal={handleCaptureModal}
        />
      )}
    </section>
  );
}

export default RegStore;
