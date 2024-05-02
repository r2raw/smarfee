import React, { useState, useEffect } from "react";
import { useParams, useOutletContext, useNavigate } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import CalculateAge from "../../MyFunctions/CalculateAge";
import Loader from "../../Loader/Loader";
import Successful from "../../FormSubmission/Successful";
import Rejected from "../../FormSubmission/Rejected";
import RejectApplication from "./RejectApplication";
function ViewStoreApp() {
  const navigate = useNavigate();
  const [backendData, setBackendData] = useState();
  const { store } = useParams();
  const { stores, renewStores } = useOutletContext();
  const [storeOperation, setStoreOperation] = useState();
  const [days, setDays] = useState();
  const [weekendData, setWeekEndData] = useState();
  const [weekdayData, setweekdayData] = useState();
  const [currStore, setCurrStore] = useState();
  const [loading, setLoading] = useState(false);
  const [approved, setApproved] = useState(false);
  const [rejected, setRejected] = useState(false);
  const [rejectApplication, setRejectApplication] = useState(false);
  useEffect(() => {
    axios
      .get(`/Admin/Store-Application/${store}`)
      .then((response) => {
        setBackendData(response.data);
      })
      .catch((error) => {});
  }, []);

  useEffect(() => {
    const foundStore = stores.find((s) => s.store_id === store);
    if (foundStore) {
      setCurrStore(foundStore);
    }
  }, [stores, store]);

  useEffect(() => {
    if (backendData) {
      setStoreOperation(backendData.storeOperation);
    }
  }, [backendData]);

  useEffect(() => {
    if (storeOperation) {
      const daysOperate = storeOperation.map((day) => day.day);

      setDays(daysOperate);
    }
  }, [storeOperation]);

  useEffect(() => {
    if (approved) {
      setTimeout(() => {
        navigate("../Store-Application");
        setApproved(false);
      }, 3000);
    }
  }, [approved]);

  useEffect(() => {
    if (rejected) {
      setTimeout(() => {
        navigate("../Store-Application");
        setRejected(false);
      }, 3000);
    }
  }, [rejected]);
  useEffect(() => {
    if (days) {
      if (days.includes("Sunday") || days.includes("Saturday")) {
        const findTime = storeOperation.find(
          (storeOpe) => storeOpe.day === "Sunday" || storeOpe.day === "Saturday"
        );

        setWeekEndData(findTime);
      }

      if (
        days.includes("Monday") ||
        days.includes("Tuesday") ||
        days.includes("Wednesday") ||
        days.includes("Thursday") ||
        days.includes("Friday")
      ) {
        const findTime = storeOperation.find(
          (storeOpe) =>
            storeOpe.day === "Monday" ||
            storeOpe.day === "Tuesday" ||
            storeOpe.day === "Wednesday" ||
            storeOpe.day === "Thursday" ||
            storeOpe.day === "Friday"
        );

        setweekdayData(findTime);
      }
    }
  }, [days]);

  const handleConfirmReject = (comment) => {
    setLoading(true);
    axios
      .post(`/Admin/Application-Reject/${store}`, { comment: comment })
      .then((res) => {
        setLoading(false);
        if (res.data.status === "success") {
          setRejected(true);
          renewStores()
        }
      })
      .catch((err) =>
        console.error("/Admin/Application-Reject/ error: " + err.message)
      );
  };
  if (!backendData || !days || !storeOperation) return <Loader />;

  if (loading) return <Loader />;
  if (approved) return <Successful message={"Store approved successfully"} />;
  if (rejected) return <Successful message={"Store rejected successfully"} />;
  let weekendOpening;
  let weekendClosing;
  if (weekendData) {
    weekendOpening = dayjs(
      new Date("1970-01-01T" + weekendData.openingtime)
    ).format("hh:mm A");
    weekendClosing = dayjs(
      new Date("1970-01-01T" + weekendData.closingtime)
    ).format("hh:mm A");
  }
  let weekdayOpening;
  let weekdayClosing;
  if (weekdayData) {
    weekdayOpening = dayjs(
      new Date("1970-01-01T" + weekdayData.openingtime)
    ).format("hh:mm A");
    weekdayClosing = dayjs(
      new Date("1970-01-01T" + weekdayData.closingtime)
    ).format("hh:mm A");
  }

  const storeImg =
    "http://localhost:5000/storeCredentials/" + currStore.storeimg;
  const storeDti = "http://localhost:5000/storeCredentials/" + currStore.dti;
  const storeClearance =
    "http://localhost:5000/storeCredentials/" + currStore.clearance;
  const storePermit =
    "http://localhost:5000/storeCredentials/" + currStore.permit;
  const validId =
    "http://localhost:5000/storeCredentials/" + currStore.valid_id;
  const vendorName = `${currStore.firstname} ${currStore.lastname}`;

  const handleViewPdf = (type, file) => {
    const url = "http://localhost:5000/storeCredentials/1713611223988-SDLC.pdf";
    const parts = file.split("/");
    const filename = parts[parts.length - 1];
    navigate(`ViewCredential/${type}/${filename}`);
  };

  const handleApprove = () => {
    setLoading(true);
    axios
      .post("/Admin/Application-Decision", {
        storeId: store,
        decision: "Approved",
      })
      .then((res) => {
        setLoading(false);
        if (res.data.status === "success") {
          renewStores();
          setApproved(true);
        }
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  const handleReject = () => {
    setRejectApplication(!rejectApplication);
  };
  return (
    <div className="view-store">
      <h1>Store: {currStore.store_id}</h1>
      <div className="store-info">
        <div className="view-store-img">
          <img src={storeImg} />
        </div>
        <div className="store-details">
          <div className="input-group">
            <input
              type="text"
              placeholder=" "
              value={currStore.store_name}
              disabled
            />
            <span className="floating-label">Store name</span>
          </div>
          <div className="input-group">
            <input
              type="text"
              placeholder=" "
              value={currStore.store_email}
              disabled
            />
            <span className="floating-label">Email</span>
          </div>
          <div className="user-contact">
            <p className="phone-number">
              Contact No. <span>+63</span>
            </p>
            <input
              className="br-4"
              type="text"
              placeholder=" "
              value={currStore.store_phone}
              disabled
            />
          </div>
        </div>
        <div className="view-store-cred">
          <div>
            <p>DTI Registration:</p>
            <button
              className="tertiary solid fade"
              onClick={() => {
                handleViewPdf("DTI", storeDti);
              }}
            >
              View
            </button>
          </div>
          <div>
            <p>Barangay Clearance:</p>
            <button
              className="tertiary solid fade"
              onClick={() => {
                handleViewPdf("Barangay Clearance", storeDti);
              }}
            >
              View
            </button>
          </div>
          <div>
            <p>Business Permit:</p>
            <button
              className="tertiary solid fade"
              onClick={() => {
                handleViewPdf("Business Permit", storeDti);
              }}
            >
              View
            </button>
          </div>
          <div>
            <p>Valid ID:</p>
            <button
              className="tertiary solid fade"
              onClick={() => {
                handleViewPdf("Valid ID", validId);
              }}
            >
              View
            </button>
          </div>
        </div>
      </div>
      <div className="operation-details">
        <h2>Operational Details</h2>

        <div className="chkboxes">
          <input
            className="hidden-box"
            type="checkbox"
            id="day1"
            value="Sunday"
            checked={days.includes("Sunday")}
            disabled
          />
          <label htmlFor="day1">Sun</label>
          <input
            className="hidden-box"
            type="checkbox"
            id="day2"
            value="Monday"
            checked={days.includes("Monday")}
            disabled
          />
          <label htmlFor="day2">Mon</label>
          <input
            className="hidden-box"
            type="checkbox"
            id="day3"
            value="Tuesday"
            checked={days.includes("Tuesday")}
            disabled
          />
          <label htmlFor="day3">Tue</label>
          <input
            className="hidden-box"
            type="checkbox"
            id="day4"
            value="Wednesday"
            checked={days.includes("Wednesday")}
            disabled
          />
          <label htmlFor="day4">Wed</label>
          <input
            className="hidden-box"
            type="checkbox"
            id="day5"
            value="Thursday"
            checked={days.includes("Thursday")}
            disabled
          />
          <label htmlFor="day5">Thu</label>
          <input
            className="hidden-box"
            type="checkbox"
            id="day6"
            value="Friday"
            checked={days.includes("Friday")}
            disabled
          />
          <label htmlFor="day6">Fri</label>
          <input
            className="hidden-box"
            type="checkbox"
            id="day7"
            value="Saturday"
            checked={days.includes("Saturday")}
            disabled
          />
          <label htmlFor="day7">Sat</label>
        </div>
        {weekdayData && (
          <div className="weekdays">
            <h3>Weekdays:</h3>
            <div id="weekday-time">
              <div className="time-container">
                <p>Opening Hours:</p>
                <div className="input-group">
                  <input
                    type="text"
                    placeholder=" "
                    value={weekdayOpening}
                    disabled
                  />
                </div>
              </div>
              <div className="time-container">
                <p>Closing Hours:</p>
                <div className="input-group">
                  <input
                    type="text"
                    placeholder=" "
                    value={weekdayClosing}
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        {(days.includes("Sunday") || days.includes("Saturday")) && (
          <div className="weekends">
            <div>
              <h3>Weekends:</h3>
            </div>
            <div>
              <div id="weekend-time">
                <div className="time-container">
                  <p>Opening Hours:</p>
                  <div className="input-group">
                    <input
                      type="text"
                      placeholder=" "
                      value={weekendOpening}
                      disabled
                    />
                  </div>
                </div>
                <div className="time-container">
                  <p>Closing Hours:</p>
                  <div className="input-group">
                    <input
                      type="text"
                      placeholder=" "
                      value={weekendClosing}
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="vendor-details">
        <div>
          <div className="input-group">
            <input type="text" placeholder=" " value={vendorName} disabled />
            <span className="floating-label">Name</span>
          </div>
          <div className="input-group">
            <input
              type="text"
              placeholder=" "
              value={currStore.store_email}
              disabled
            />
            <span className="floating-label">Email</span>
          </div>
          <div className="input-group">
            <input type="text" placeholder=" " value={currStore.sex} disabled />
            <span className="floating-label">Sex</span>
          </div>
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
              value={currStore.vendor_phone}
              disabled
            />
          </div>
          <div className="input-group">
            <input
              type="text"
              placeholder=" "
              value={dayjs(currStore.birthdate).format("MM-DD-YYYY")}
              disabled
            />
            <span className="floating-label">Birthdate</span>
          </div>
          <div>
            <p>Age:{CalculateAge(currStore.birthdate)} </p>
          </div>
        </div>
      </div>
      <div className="application-decision">
        <button className="solid danger fade" onClick={handleReject}>
          Reject
        </button>
        <button className="solid approve fade" onClick={handleApprove}>
          Approve
        </button>
      </div>
      {rejectApplication && (
        <RejectApplication
          handleReject={handleReject}
          handleConfirmReject={handleConfirmReject}
        />
      )}
    </div>
  );
}

export default ViewStoreApp;
