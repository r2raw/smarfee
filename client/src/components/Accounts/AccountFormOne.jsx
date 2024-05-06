import React from 'react'

import img1 from "../my-images/userImg/default.jpg"
function AccountFormOne() {
  return (
    <form>
      <div className="img-container card">
        <img src={img1} alt="asd"/>
      </div>
      <button className="blue solid fade">Save Photo</button>
      <button className="solid tertiary fade">Upload Photo</button>
    </form>
  )
}

export default AccountFormOne