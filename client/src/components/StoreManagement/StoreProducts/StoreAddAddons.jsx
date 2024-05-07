import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";
import UploadSharpIcon from "@mui/icons-material/UploadSharp";
import axios from "axios";
import Loader from "../../Loader/Loader";
import Successful from "../../FormSubmission/Successful"
function StoreAddAddons() {
  const { backendData } = useOutletContext();
  const [preview, setPreview] = useState();
  const [image, setImage] = useState();
  const [loading, setLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [disabled, setDisabled] = useState(true);
  const navigate = useNavigate();
  const [values, setValues] = useState({
    storeId: backendData.vendor.store_id,
    name: "",
    price: "",
    size: "",
  });

  const uploadAddOns = useCallback((e) => {

    const formData = new FormData(e.target);
    formData.append("storeId", backendData.vendor.store_id)
    axios.post("https://smarfee.vercel.app/insert-addons", formData).then(res => {
      if(res.data.status === "success"){
        setSuccessful(true);
        return;
      }
      return setErrMessage(res.data.errMessage);
    })
  }, []);

  function handleFileChange(e) {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files;
      console.log(file);
      setImage(() => file);
    } else {
      setImage(null);
    }
  }
  const handleKeyDown = (e) => {
    const { keyCode } = e;
    const inputValue = e.target.value;

    if (
      keyCode === 8 ||
      keyCode === 46 ||
      keyCode === 37 ||
      keyCode === 39 ||
      keyCode === 40 ||
      keyCode === 16
    ) {
      return;
    }
    if (inputValue !== "") {
      if (keyCode === 190 || keyCode === 110) {
        if (inputValue.includes(".")) {
          e.preventDefault();
        }
        return;
      }
    }

    if ((keyCode >= 48 && keyCode <= 57) || (keyCode >= 96 && keyCode <= 105)) {
      const decimalIndex = inputValue.indexOf(".");
      if (
        decimalIndex !== -1 &&
        inputValue.substring(decimalIndex + 1).length >= 2
      ) {
        e.preventDefault();
      }
      return;
    }

    e.preventDefault();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
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

  useEffect(() => {
    let valid = true;
    for (const fieldname in values) {
      if (values[fieldname] === "") {
        valid = false;
      }
    }

    if (!image) {
      valid = false;
    }
    setDisabled(!valid);
  }, [values, image]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true)
    axios
      .post("/validate-addons", values)
      .then((res) => {
        setLoading(false)
        if ((res.data.status === "success")) {
          uploadAddOns(e)
          return;
        }
        return setErrMessage(res.data.errmessage)
      })
      .catch((err) => console.error("addons error: "+ err.message));
  };

  useEffect(()=>{
    if(errMessage !== ''){
      setTimeout(()=>{
        setErrMessage('')
      }, 3000)
    }
  },[errMessage])

  useEffect(()=>{
    if(successful){
      setTimeout(()=>{
        setSuccessful(false);
        navigate("../Products")
      },3000)
    }
  }, [successful])

  if(loading) return <Loader />

  if(successful) return <Successful message="Product saved successfully!" />
  return (
    <div className="add-addons">
      <Link to="../Products">
        <div className="go-back">
          <ArrowBackSharpIcon />
        </div>
      </Link>
      <h1>Product add-ons information</h1>
      <form onSubmit={handleSubmit}>
        <div className="product-info">
          <div className="">
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
              name="productImg"
              onChange={handleFileChange}
              accept="image/png, image/jpeg"
              required
            />
            <label className="upload-label" htmlFor="store-img-upload">
              <UploadSharpIcon /> Upload
            </label>
          </div>
          <div className="product-info-second">
            <div className="input-group">
              <input
                type="text"
                placeholder=" "
                onChange={handleInputChange}
                value={values.name}
                name="name"
                required
              />
              <span className="floating-label">Product name</span>
            </div>
            <div className="input-group">
              <input
                type="text"
                placeholder=" "
                name="price"
                onChange={handleInputChange}
                value={values.price}
                onKeyDown={handleKeyDown}
                maxLength={10}
                required
              />
              <span className="floating-label">Price</span>
            </div>
            <div className="selection">
              <p>Size: </p>
              <select
                name="size"
                onChange={handleInputChange}
                value={values.size}
              >
                <option value="">Pick an option</option>
                <option>Regular</option>
                <option>Medium</option>
                <option>Large</option>
              </select>
            </div>
          </div>
        </div>
        {loading ? 
        <button
          className="solid tertiary fade"
          style={{ width: "100%" }}
          disabled
        >
          Loading...
        </button> : 
        <button
          className="solid tertiary fade"
          style={{ width: "100%" }}
          disabled={disabled}
        >
          Save
        </button>}
        <p className="invalid">{errMessage}</p>
      </form>
    </div>
  );
}

export default StoreAddAddons;
