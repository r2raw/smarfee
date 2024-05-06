import React, { useEffect, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { TextField } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import dayjs from "dayjs";
function SecondSecReject(props) {
    const { handleDataChange, formData, handleOperatingDay } = props;
    const popperSx = {
      border: "1px solid red",
    };
  
    const [sameTime, setSameTime] = useState();
    const [operatingDays, setOperatingDays] = useState([]);
  
    const handleInputChange = (e) => {
      const { name, value, type } = e.target;
      const valid = e.target.validity.valid;
  
      if (type === "checkbox") {
        setOperatingDays((prevDays) => {
          if (prevDays.includes(value)) {
            return prevDays.filter((day) => day !== value);
          } else {
            return [...prevDays, value];
          }
        });
        return;
      }
  
      handleDataChange(name, value, valid);
    };
  
    const handleTimeChange = (e, name) => {
      // const newName = name;
      const value = dayjs(e).format("HH:mm:ss");
  
      handleDataChange(name, value, true);
    };
  
    useEffect(() => {
      handleOperatingDay(operatingDays);
    }, [operatingDays]);
  
    useEffect(() => {
      if (sameTime) {
        handleDataChange("weekendOpening", formData.weekdayOpening.value, true);
        handleDataChange("weekendClosing", formData.weekdayClosing.value, true);
      } else {
        handleDataChange("weekendOpening", "", true);
        handleDataChange("weekendClosing", "", true);
      }
    }, [sameTime, formData.weekdayOpening, formData.weekdayClosing]);
    const handleCheckChange = (e) => {
      const { checked } = e.target;
      props.handleCheckChange(checked)
      setSameTime(checked);
    };
  return (
    <div className="second-section reg-section">
      <h2>Operating Details</h2>
      <div className="chkboxes">
        <input
          className="hidden-box"
          type="checkbox"
          id="day1"
          onChange={handleInputChange}
          value="Sunday"
        />
        <label htmlFor="day1">Sun</label>
        <input
          className="hidden-box"
          type="checkbox"
          id="day2"
          onChange={handleInputChange}
          value="Monday"
        />
        <label htmlFor="day2">Mon</label>
        <input
          className="hidden-box"
          type="checkbox"
          id="day3"
          onChange={handleInputChange}
          value="Tuesday"
        />
        <label htmlFor="day3">Tue</label>
        <input
          className="hidden-box"
          type="checkbox"
          id="day4"
          onChange={handleInputChange}
          value="Wednesday"
        />
        <label htmlFor="day4">Wed</label>
        <input
          className="hidden-box"
          type="checkbox"
          id="day5"
          onChange={handleInputChange}
          value="Thursday"
        />
        <label htmlFor="day5">Thu</label>
        <input
          className="hidden-box"
          type="checkbox"
          id="day6"
          onChange={handleInputChange}
          value="Friday"
        />
        <label htmlFor="day6">Fri</label>
        <input
          className="hidden-box"
          type="checkbox"
          id="day7"
          onChange={handleInputChange}
          value="Saturday"
        />
        <label htmlFor="day7">Sat</label>
      </div>
      {(operatingDays.includes("Monday") ||
        operatingDays.includes("Tuesday") ||
        operatingDays.includes("Wednesday") ||
        operatingDays.includes("Thursday") ||
        operatingDays.includes("Friday")) && (
        <div className="weekdays">
          <h3>Weekdays:</h3>
          <div>
            <div className="time-container">
              <p>Opening Hours:</p>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  label="Select time"
                  name="weekdayOpening"
                  value={dayjs(formData.weekdayOpening.value, "hh:mm A")}
                  minutesStep={30}
                  onChange={(e) => handleTimeChange(e, "weekdayOpening")}
                />
              </LocalizationProvider>
            </div>
            <div className="time-container">
              <p>Closing Hours:</p>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  label="Select time"
                  name="weekdayClosing"
                  minutesStep={30}
                  value={dayjs(formData.weekdayClosing.value, "hh:mm A")}
                  onChange={(e) => handleTimeChange(e, "weekdayClosing")}
                />
              </LocalizationProvider>
            </div>
          </div>
        </div>
      )}
      {(operatingDays.includes("Sunday") ||
        operatingDays.includes("Saturday")) && (
        <div>
          <h3>Weekends:</h3>
          <div className="weekends">
            {(operatingDays.includes("Monday") ||
              operatingDays.includes("Tuesday") ||
              operatingDays.includes("Wednesday") ||
              operatingDays.includes("Thursday") ||
              operatingDays.includes("Friday")) && (
              <div>
                <input
                  type="checkbox"
                  id="sameTime"
                  onChange={handleCheckChange}
                />
                <label htmlFor="sameTime">Same as weekdays?</label>
              </div>
            )}
          </div>
          {!sameTime && (
            <div className="weekend-time">
              <div className="time-container">
                <p>Opening Hours:</p>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    label="Select time"
                    name="weekendOpening"
                    minutesStep={30}
                    value={dayjs(formData.weekendOpening.value, "hh:mm A")}
                    onChange={(e) => handleTimeChange(e, "weekendOpening")}
                  />
                </LocalizationProvider>
              </div>
              <div className="time-container">
                <p>Closing Hours:</p>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    label="Select time"
                    name="weekendClosing"
                    minutesStep={30}
                    value={dayjs(formData.weekendClosing.value, "hh:mm A")}
                    onChange={(e) => handleTimeChange(e, "weekendClosing")}
                  />
                </LocalizationProvider>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SecondSecReject