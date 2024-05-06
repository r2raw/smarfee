import React, { useState, useEffect } from "react";

import img1 from "../my-images/userImg/default.jpg";
function AccountFormOne(props) {
  const { userData } = props;
  const url = `http://localhost:5000/userImg/${userData.img}`;

  const [preview, setPreview] = useState();
  const [image, setImage] = useState();

  function handleFileChange(e) {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files;
      console.log(file);
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
      <div className="img-container card">
        {/* <img src={url} alt="asd" /> */}
        {preview &&
          image &&
          preview.map((pic) => {
            return <img className="empl-img" src={pic} alt="img" />;
          })}
      </div>
      {image && <button className="blue solid fade">Save Photo</button>}
      {userData.firstname && (
        <>
          <input
            type="file"
            name="userImg"
            id="userImg"
            onChange={handleFileChange}
            accept="image/png, image/jpeg"
          />
          <label htmlFor="userImg">Upload photo</label>
        </>
      )}
    </form>
  );
}

export default AccountFormOne;
