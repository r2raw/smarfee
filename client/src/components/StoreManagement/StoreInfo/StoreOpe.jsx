import React, { useEffect, useState } from "react";
import Loader from "../../Loader/Loader";
import dayjs from "dayjs"
function StoreOpe(props) {
  const { storeOpe } = props;
  const [days, setDays] = useState();
  const [weekdayData, setweekdayData] = useState();
  const [weekendData, setWeekendData] = useState();
  useEffect(() => {
    setDays(storeOpe.map((i) => i.day));
    const weekday = storeOpe.find(
      (i) =>
        i.day === "Monday" ||
        i.day === "Tuesday" ||
        i.day === "Wednesday" ||
        i.day === "Thursday" ||
        i.day === "Friday"
    );

    const weekend = storeOpe.find(
      (i) => i.day === "Sunday" || i.day === "Saturday"
    );

    if (weekday) {
      setweekdayData(weekday);
    }

    if (weekend) {
      setWeekendData(weekend);
    }
  }, []);

  if (!days && (!weekdayData || !weekendData)) return <p>Store Operation loading...</p>;
  return (
    <div>
      <h2>Operation Details</h2>
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
                    value={dayjs("1970-01-01t" + weekdayData.openingtime).format("hh:mm A")}
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
                    value={dayjs("1970-01-01t" + weekdayData.closingtime).format("hh:mm A")}
                  disabled
                />
              </div>
            </div>
          </div>
        </div>
      )}
      {weekendData && (
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
                    value={dayjs("1970-01-01t" + weekendData.openingtime).format("hh:mm A")}
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
                    value={dayjs("1970-01-01t" + weekendData.closingtime).format("hh:mm A")}
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StoreOpe;
