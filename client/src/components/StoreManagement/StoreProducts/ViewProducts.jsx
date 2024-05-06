import React, { useCallback, useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";
import UploadSharpIcon from "@mui/icons-material/UploadSharp";
import _ from "lodash";
import { titleCase } from "title-case";
import axios from "axios";
import Successful from "../../FormSubmission/Successful";
import Loader from "../../Loader/Loader";
function ViewProducts() {
  const navigate = useNavigate();
  const { code } = useParams();
  const { backendData, renewProduct } = useOutletContext();
  const [preview, setPreview] = useState();
  const [image, setImage] = useState();
  const [succesful, setSuccessful] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [errMessage, setErrMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState();
  const [values, setValues] = useState({
    storeId: "",
    name: "",
    price: "",
    category: "",
    type: "",
    size: "",
    availability: "",
  });

  useEffect(() => {
    const findProduct = backendData.storeProducts.find(
      (i) => i.productcode === code
    );

    if (findProduct) {
      setProduct(findProduct);
      setValues((prev) => ({
        ...prev,
        storeId: findProduct.storeid,
        name: titleCase(_.lowerCase(findProduct.productname)),
        price: findProduct.productprice,
        category: findProduct.category,
        type: findProduct.type,
        size: findProduct.size,
        availability: findProduct.availability,
      }));
    }
  }, [backendData.storeProducts]);
  function handleFileChange(e) {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files;
      setImage(() => file);
    } else {
      setImage(null);
    }
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

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (errMessage !== "") {
      setTimeout(() => {
        setErrMessage("");
      }, 3000);
    }
  }, [errMessage]);
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

  useEffect(() => {
    if (succesful) {
      setTimeout(() => {
        setSuccessful(false);
        navigate("../Products");
      }, 3000);
    }
  }, [succesful]);
  useEffect(() => {
    let valid = true;

    for (const fieldname in values) {
      if (values[fieldname] === "") {
        valid = false;
      }
    }
    setDisabled(!valid);
  }, [values]);

  const upload = useCallback(
    (e) => {
      let formdata = new FormData(e.target);
      formdata.append("productId", product.id);
      axios
        .post("/uploadUpdateProductImg", formdata)
        .then((res) => {
          if (res.data.status === "success") {
            setLoading(false);
            renewProduct();
            setSuccessful(true);
          }
        })
        .catch((err) => console.error("ProductUpload ERROR: " + err.message));
    },
    [values]
  );

  const noimg = useCallback(() => {
    if (product.id) {
      axios
        .post("/uploadUpdateProduct", {
          ...values,
          productId: product.id,
          origCateg: product.category,
          origCode: product.productcpde,
        })
        .then((res) => {
          setLoading(false);
          if (res.data.status === "success") {
            renewProduct();
            setSuccessful(true);
          }
        })
        .catch((err) => console.error("ProductUpload ERROR: " + err.message));
    }
  }, [values]);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault(e);
      setLoading(true);
      const response = await axios.post("/validateProductUpdate", {
        ...values,
        prod_id: product.id,
      });

      if (response.data.status === "success") {
        if (!image) {
          noimg();
          return;
        }

        console.log("with img");
        upload(e);
        return;
      }

      setLoading(false);
      return setErrMessage(response.data.errmessage);
    } catch (error) {
      console.error("validateProduct error:  " + error.message);
    }
  };
  if (!product) return <Loader />;
  if (succesful) return <Successful message="Product updated successfully!" />;
  return (
    <div className="add-product">
      <Link to="../Products">
        <div className="go-back">
          <ArrowBackSharpIcon />
        </div>
      </Link>
      <h1>Product Information</h1>
      <form onSubmit={handleSubmit}>
        <div className="product-info">
          <div>
            <div className="img-container">
              {preview && image ? (
                preview.map((pic) => {
                  return <img className="empl-img" src={pic} alt="img" />;
                })
              ) : (
                <img
                  src={`http://localhost:5000/storeProducts/${product.productimg}`}
                />
              )}
            </div>
            <input
              type="file"
              id="product-img"
              name="productImg"
              onChange={handleFileChange}
              accept="image/png, image/jpeg"
            />
            <label className="upload-label" htmlFor="product-img">
              <UploadSharpIcon /> Upload
            </label>
          </div>
          <div className="product-info-second">
            <div className="input-group">
              <input
                type="text"
                placeholder=" "
                name="name"
                value={values.name}
                onChange={handleInputChange}
                required
              />
              <span className="floating-label">Product name</span>
            </div>
            <div className="input-group">
              <input
                value={values.price}
                type="text"
                placeholder=" "
                required
                name="price"
                maxLength={10}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
              />
              <span className="floating-label">Price</span>
            </div>
            <div className="selection">
              <p>Category: </p>
              <select
                value={values.category}
                name="category"
                onChange={handleInputChange}
              >
                <option value="">Pick an option</option>
                <option>Rice Meal</option>
                <option>Desserts & Drinks</option>
                <option>Pastas</option>
                <option>Burgers & Fries</option>
              </select>
            </div>
            <div className="selection">
              <p>Type: </p>
              <select
                value={values.type}
                name="type"
                onChange={handleInputChange}
              >
                <option value="">Pick an option</option>
                <option>Regular</option>
                <option>Morning special</option>
                <option>Afternoon special</option>
              </select>
            </div>
            <div className="selection">
              <p>Size: </p>
              <select
                value={values.size}
                name="size"
                onChange={handleInputChange}
              >
                <option value="">Pick an option</option>
                <option>Regular</option>
                <option>Medium</option>
                <option>Large</option>
              </select>
            </div>
            <div className="rdbtn">
              <input
                type="radio"
                value="Available"
                name="availability"
                onChange={handleInputChange}
                checked={values.availability === "Available"}
                required
                id="prod-available"
              />
              <label htmlFor="prod-available">Available</label>
              <input
                type="radio"
                value="Unavailable"
                name="availability"
                onChange={handleInputChange}
                checked={values.availability === "Unavailable"}
                required
                id="prod-unavailable"
              />
              <label htmlFor="prod-unavailable">Unvailable</label>
            </div>
          </div>
        </div>
        {loading ? (
          <button
            style={{ width: "100%" }}
            disabled={true}
            className="solid tertiary fade"
          >
            Loading
          </button>
        ) : (
          <button
            style={{ width: "100%" }}
            disabled={disabled}
            className="solid tertiary fade"
          >
            Save
          </button>
        )}
        {errMessage && <p className="invalid">{errMessage}</p>}
      </form>
    </div>
  );
}

export default ViewProducts;
