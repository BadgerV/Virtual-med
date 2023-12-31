import { useEffect, useState } from "react";
import "./collectAvailableTimeAndNickname.css";
import { useDispatch, useSelector } from "react-redux";
import { setUserNickname } from "../../redux/user/UserSlice";
import { useNavigate } from "react-router-dom";
import { setStaffAvailability } from "../../redux/user/UserSlice";

const AvailabilityForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [availability, setAvailability] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [isLoading, setIsloading] = useState(false);

  const addAvailability = () => {
    if (selectedDate && startTime && endTime) {
      const newSlot = {
        day: selectedDate,
        startTime,
        endTime,
      };

      setAvailability([...availability, newSlot]);

      // Reset input fields after adding the availability slot if needed.
      setSelectedDate("");
      setStartTime("");
      setEndTime("");
    }
  };

  useEffect(() => {
    console.log(availability);
  }, [availability]);

  const handleSetAvailability = async () => {
    if (availability.length > 0) {
      setIsloading(true);
      await dispatch(setStaffAvailability(availability));
      navigate("/");
    } else {
      return;
    }
  };

  return (
    <div className="container">
      <div className="available-time">
        <h2>Set Your Availability</h2>
        <span className="collected-dates-span">
          Please make sure to add available dates in one-hour intervals. For
          example, if you choose December 12, 2023, with a start time of 10:00
          AM, set the end time as 11:00 AM. You can add availability first using
          the "Add Availability" button and then submit the dates using the
          "Submit" button. Ensure that you have added dates before proceeding
          with the submission.
        </span>
        <div className="collect-container">
          <label className="bold-collect-label">Date:</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>
        <div>
          <label className="bold-collect-label">Start Time:</label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </div>
        <div>
          <label className="bold-collect-label">End Time:</label>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>

        <div className="collect-button__container">
          <button className="custom-button" onClick={addAvailability}>
            Add Availability
          </button>
          <button className="custom-button" onClick={handleSetAvailability}>
            {isLoading ? <img src="/assets/spinner.svg" /> : "Submit"}
          </button>
        </div>

        {/* Display the collected availability */}
        <div>
          <h3>Your Selected Slots:</h3>
          {availability.map((slot, index) => (
            <div key={index}>
              {`${new Date(slot.day).toLocaleDateString()} | ${
                slot.startTime
              } - ${slot.endTime}`}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AvailabilityForm;

export const SetNickName = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (nickname === "") {
      return;
    } else {
      await dispatch(setUserNickname(nickname));
    }
  };
  const [isHovered, setIsHovered] = useState(false);
  const [nickname, setNickname] = useState("");

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const user = useSelector((state) => state.userSlice.user);

  useEffect(() => {
    console.log(user);
    if (user.nickName || user.accountType === "staff") {
      navigate("/");
    }
  }, [user]);

  return (
    <div className="container">
      <div className="nickname-container">
        <div className="nickname-header">
          <span className="set-nickname_text">Set nickname</span>
        </div>
        <div className="together">
          <div className="inner-together">
            <label htmlFor="nickname">Nickname</label>
            <span
              className="set-nickname_query"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              ?
            </span>
            {isHovered && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  backgroundColor: "#f0f0f0",
                  padding: "10px",
                  borderRadius: "5px",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  fontSize: "0.8em",
                }}
              >
                Intended for privacy, this is the name others clients on the
                platform will see
              </div>
            )}
          </div>

          <input
            type="text"
            placeholder="Nickname"
            name="nickname"
            onChange={(e) => setNickname(e.target.value)}
          />
        </div>

        <div className="nickname-button-cont">
          <button className="submit-nickname" onClick={(e) => handleSubmit(e)}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
