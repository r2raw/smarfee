import React, { useState, useEffect } from "react";
import axios from "axios";
import UploadSharpIcon from "@mui/icons-material/UploadSharp";
function FirstSection(props) {

  const {handleDataChange, error, formData} = props;
  const [docuFileNames, setDocuFileNames] = useState({
    dti: "",
    clearance: "",
    permit: "",
    validid: "",
  });
  function handleDocuFileChange(e) {
    const filePath = e.target.value;

    const name = e.target.name;
    const parts = filePath.split("\\");

    const filename = parts[parts.length - 1];

    handleInputChange(e);
    setDocuFileNames((prev) => ({
      ...prev,
      [name]: filename,
    }));
  }

  const [preview, setPreview] = useState();
  const [image, setImage] = useState();

  function handleFileChange(e) {
    if (e.target.files && e.target.files.length > 0) {
      
      const file = e.target.files;
      console.log(file)
      setImage(() => file);
    }else{
      setImage(null)
    }

    
    handleInputChange(e);
  }

  useEffect(() => {
    if (!image) return setPreview("");

    let tmp = [];

    for (let i = 0; i < image.length; i++) {
      tmp.push(URL.createObjectURL(image[i]));
    }

    const objectUrl = tmp;
    setPreview(objectUrl);

    for (let i = 0; i < objectUrl.length; i++) {
      return () => {
        URL.revokeObjectURL(objectUrl[i]);
      };
    }
  }, [image]);

  const handleInputChange = (e)=>{
    const {name, value, type} = e.target;
    const valid = e.target.validity.valid;

    if(type === "file"){

     const file = e.target.files[0];
      
    return handleDataChange(name, file, valid);
    }


    handleDataChange(name, value, valid);
  }

  return (
    <div className="first-section reg-section">
      <h2>Store Details</h2>
      <div className="section-grid">
        <div className="grid-item store-img">
          <div className="img-container">
            {preview &&
              image &&
              preview.map((pic) => {
                return <img className="empl-img" src={pic} alt="img" />;
              })}
          </div>
          <input
            type="file"
            id="store-img-upload"
            name="storeImg"
            // value={preview}
            onChange={handleFileChange}
            accept="image/png, image/jpeg"
            required
          />
          <label className="upload-label" htmlFor="store-img-upload">
            <UploadSharpIcon /> Upload
          </label>
        </div>
        <div className="grid-item">
          <div className="input-group">
            <input
              className="br-4"
              type="text"
              name="storeName"
              value={formData.storeName.value}
              placeholder=" "
              onChange={handleInputChange}
              required
            />
            <span className="floating-label">Store name</span>
          </div>
          {error.storeName && <p className="invalid">{error.storeName}</p>}
          <div className="input-group">
            <input
              className="br-4"
              type="email"
              name="email"
              placeholder=" "
              value={formData.email.value}
              onChange={handleInputChange}
              required
            />
            <span className="floating-label">Email</span>
          </div>
          
          {error.email && <p className="invalid">{error.email}</p>}
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
              value={formData.phone.value}
              onChange={handleInputChange}
              placeholder=" "
              required
            />
          </div>
        </div>
        <div className="grid-item">
          <div className="file-button-container">
            <p>DTI Registration: {docuFileNames?.dti}</p>
            <input
              type="file"
              name="dti"
              id="store-dti-upload"
              accept="application/pdf"
              required
              onChange={handleDocuFileChange}
            />
            <label className="upload-label" htmlFor="store-dti-upload">
              <UploadSharpIcon /> Upload
            </label>
          </div>
          <div className="file-button-container">
            <p>Barangay Clearance: {docuFileNames?.clearance}</p>
            <input
              type="file"
              name="clearance"
              id="store-clearance-upload"
              accept="application/pdf"
              onChange={handleDocuFileChange}
              required
            />
            <label className="upload-label" htmlFor="store-clearance-upload">
              <UploadSharpIcon /> Upload
            </label>
          </div>
          <div className="file-button-container">
            <p>Business Permit: {docuFileNames?.permit}</p>
            <input
              type="file"
              name="permit"
              id="store-permit-upload"
              accept="application/pdf"
              onChange={handleDocuFileChange}
              required
            />
            <label className="upload-label" htmlFor="store-permit-upload">
              <UploadSharpIcon /> Upload
            </label>
          </div>
          <div className="file-button-container">
            <p>Valid ID: {docuFileNames?.validid}</p>
            <input
              type="file"
              name="validid"
              id="store-validid-upload"
              accept="application/pdf"
              onChange={handleDocuFileChange}
              required
            />
            <label className="upload-label" htmlFor="store-validid-upload">
              <UploadSharpIcon /> Upload
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FirstSection;
