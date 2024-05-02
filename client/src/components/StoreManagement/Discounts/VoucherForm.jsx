import React, { useState, useEffect } from "react";

import VoucherStartDate from "./VoucherStartDate";
import VoucherEndDate from "./VoucherEndDate";
function VoucherForm() {
  const [preview, setPreview] = useState();
  const [image, setImage] = useState();
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
  return (
    <form>
      <h1>Voucher duration</h1>
      <div className="form-content">
        <div className="voucher-upload">
          <div className="img-container card">
            {preview &&
              image &&
              preview.map((pic) => {
                return <img src={pic} alt="img" />;
              })}
          </div>
          <label htmlFor="voucher-upload" className="card">
            Upload photo
          </label>
          <input
            onChange={handleFileChange}
            type="file"
            accept="image/png, image/jpeg"
            id="voucher-upload"
          />
        </div>
        <div className="voucher-duration">
          <VoucherStartDate />
          <VoucherEndDate />
        </div>
      </div>
      <button className="tertiary solid fade card">Confirm</button>
    </form>
  );
}

export default VoucherForm;
