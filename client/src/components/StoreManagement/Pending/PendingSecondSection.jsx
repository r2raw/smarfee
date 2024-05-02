import React from "react";
import dayjs from "dayjs";
function PendingSecondSection(props) {
  const { storeOpe } = props;

  // console.log(dayjs("Monday").format("d"));
  return (
    <div>
      <div className="second-section reg-section">
        <h2>Operating Details</h2>
        <div className="operation-days">
          {storeOpe.map((i, index) => {
            return <p key={index}>{i.day}</p>;
          })}
        </div>
        <div className="weekdays">
          <h3>Weekdays:</h3>
          <div>
            <div className="time-container">
              <p>Opening Hours:</p>
              <p>10:00</p>
            </div>
            <div className="time-container">
              <p>Closing Hours:</p>
              <p>10:00</p>
            </div>
          </div>
        </div>
        <div className="weekends">
          <div>
            <h3>Weekends:</h3>
            <input type="checkbox" id="sameTime" />
            <label htmlFor="sameTime">Same as weekdays?</label>
          </div>
          <div>
            <div className="time-container">
              <p>Opening Hours:</p>
              <p>10:00</p>
            </div>
            <div className="time-container">
              <p>Closing Hours:</p>
              <p>10:00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PendingSecondSection;
