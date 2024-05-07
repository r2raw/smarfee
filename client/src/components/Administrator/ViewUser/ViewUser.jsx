import React, { useEffect, useState } from "react";
import defaultImg from "../../my-images/userImg/default.jpg";
import dayjs from "dayjs";
import axios from "axios";
import { Link, useNavigate, useOutletContext, useParams } from "react-router-dom";
import calculateAge from "../../MyFunctions/CalculateAge";
import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";
import DeactivateUser from "./DeactivateUser";
import Loader from "../../Loader/Loader";
import Successful from "../../FormSubmission/Successful";
function ViewUser() {
  const {updateuUserAccount} = useOutletContext();
  const [loading, setLoading] = useState(true);
  const [successful, setSuccessful] = useState(false);
  const [userData, setUserData] = useState();
  const [deactivateUser, setDeactivateUser] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const { userId } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`https://smarfee.vercel.app/Admin/Accounts/${userId}`)
      .then((res) => {
        setUserData(res.data.userinfo);
      })
      .catch((err) => console.error("Admin View User Error: " + err));
  }, []);

  useEffect(() => {
    if (userData) {
      setLoading(false);
    }
  }, [userData]);

  const handleDeactivation = () => {
    setDeactivateUser(!deactivateUser);
  };

  const handleConfirm = () => {
    setConfirmed(true);
  };

  useEffect(() => {
    if (confirmed) {
      setLoading(true);
      axios.post(`https://smarfee.vercel.app/deactivate-user/${userId}`).then((res) => {
        setLoading(false);
        if (res.data.status === "success") {
          updateuUserAccount();
          setSuccessful(true);
        }
      }).catch(err => console.error("user-deactivation err: " + err.message));
    }
  }, [confirmed]);

  useEffect(()=>{
    if(successful){
      setTimeout(()=>{
        setSuccessful(false);
        navigate("../Accounts")
      }, 3000)
    }
  },[successful])
  if (loading) return <Loader />;
  if (successful) return <Successful message="User deactivated successfully" />;
  const {
    firstname,
    lastname,
    email,
    role,
    phone,
    sex,
    userid,
    birthdate,
    store_name,
  } = userData;

  return (
    <div className="view-user">
      <Link to="../Accounts">
        <div className="go-back">
          <ArrowBackSharpIcon />
        </div>
      </Link>
      <p className="userid">ID: {userid}</p>
      <div className="user-img">
        <div className="img-container">
          <img src={defaultImg} alt="userimage" />
        </div>
        <h1>
          {firstname ? firstname : "---"} {lastname ? lastname : "---"}
        </h1>
      </div>
      <div className="user-info">
        <div>
          <div className="input-group">
            <input type="text" placeholder=" " value={email} disabled />
            <span className="floating-label">Email</span>
          </div>
          <div className="user-type">
            <div className="input-group">
              <input type="text" placeholder=" " value={role} disabled />
              <span className="floating-label">User type</span>
            </div>
            {store_name && (
              <div className="input-group">
                <input
                  type="text"
                  placeholder=" "
                  value={store_name}
                  disabled
                />
                <span className="floating-label">Store name</span>
              </div>
            )}
          </div>

          <p>Sex: {sex ? sex : "--"}</p>
        </div>
        <div>
          <div className="user-contact">
            <p className="phone-number">
              Contact No. <span>+63</span>
            </p>
            <input
              className="br-4"
              type="text"
              placeholder=" "
              value={phone}
              disabled
            />
          </div>

          {birthdate && (
            <div className="age-info">
              <div className="birthdate-container">
                <div className="input-group">
                  <input
                    type="text"
                    placeholder=" "
                    value={dayjs(birthdate).format("MM-DD-YYYY")}
                    disabled
                  />
                  <span className="floating-label">Birthdate</span>
                </div>
              </div>
              <p>Age: {calculateAge(birthdate)}</p>
            </div>
          )}
        </div>
      </div>
      <button onClick={handleDeactivation} className="danger fade solid">
        Deactivate
      </button>
      {deactivateUser && (
        <DeactivateUser
          userId={userId}
          handleConfirm={handleConfirm}
          handleDeactivation={handleDeactivation}
        />
      )}
    </div>
  );
}

export default ViewUser;
