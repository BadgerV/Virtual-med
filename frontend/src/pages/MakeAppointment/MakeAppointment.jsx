import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  confirmAppointment,
  getAvailableTimeForDoctor,
  makeAppointment,
} from "../../redux/user/UserSlice";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import {
  parseDateWithMoment,
  formatCustomDate,
  generateTimeSlots,
  organizeByDayAndDate,
} from "../../utils/helper";
import "./makeAppointment.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MakeAppointment = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const getDoctorAvailDates = async () => {
      await dispatch(getAvailableTimeForDoctor(id));
    };

    getDoctorAvailDates();
  }, [dispatch, id]);

  const loading = useSelector(
    (state) => state.userSlice.loadingDoctorAvailableTime
  );
  const doctorAvail = useSelector(
    (state) => state?.userSlice?.doctorAvailableTime
  );

  const isError = useSelector((state) => state?.userSlice?.isError);

  const timesArray = [];
  doctorAvail?.map((doctorTime) => {
    const result = generateTimeSlots(
      doctorTime.startTime,
      doctorTime.endTime,
      60,
      doctorTime.year // Pass the year to the function
    );
    timesArray.push(result);
    return null;
  });

  const allTimeArray = [];
  timesArray?.map((time) => {
    time.map((innerTime) => {
      allTimeArray.push(formatCustomDate(innerTime.start));
      return null;
    });
    return null;
  });

  const result = organizeByDayAndDate(allTimeArray);

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState(null);
  const [duration, setDuration] = useState(null);
  const [parsedDate, setParsedDate] = useState(null);
  const [isLoading, setIsloading] = useState(false);

  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (selectedDate && selectedTime) {
      console.log(
        `${selectedDate} ${selectedTime} ${result[selectedDate].year}`
      );

      const pDate = parseDateWithMoment(
        `${selectedDate} ${selectedTime} ${result[selectedDate].year}`
      );
      setParsedDate(pDate);

      console.log(pDate);
    } else {
      return;
    }
  }, [selectedTime, selectedDate, doctorAvail]);

  useEffect(() => {
    if (selectedDuration) {
      if (selectedDuration && selectedDuration.trim() !== "") {
        // Ensure selectedDuration is not null, undefined, or an empty string
        const durationParts = selectedDuration.split(" ");
        if (durationParts.length > 0) {
          setDuration(durationParts[0]);
        } else {
          // Handle the case where split doesn't return any parts
          console.error("Invalid selectedDuration:", selectedDuration);
        }
      } else {
        // Handle the case where selectedDuration is null, undefined, or an empty string
        console.error("Invalid selectedDuration:", selectedDuration);
      }
    }
  }, [selectedDuration]);

  const handleSubmit = async (
    e,
    doctorId,
    duration,
    appointmentTime,
    notes
  ) => {
    e.preventDefault();
    if (!id || !duration || !parsedDate || !notes || notes.length === 0) {
      return;
    } else {
      setIsloading(true);
      await dispatch(
        makeAppointment({ doctorId, duration, appointmentTime, notes })
      );
    }
  };

  const url = useSelector((state) => state.userSlice.url);

  useEffect(() => {
    if (url !== "") {
      window.open(url, "_self");
    }
  }, [url]);

  useEffect(() => {
    if (isError) {
      throwToastifyError();
    }
  }, [isError]);

  const throwToastifyError = () => {
    notify();
    return;
  };

  const notify = () => toast.error("Something went wrong");
  return (
    <>
      {loading ? (
        <LoadingComponent />
      ) : (
        <div className="make-appointment">
          <div className="make-appointment-head">
            <div className="going-back">
              <img src="/assets/arrow-back.svg" alt="back" />
              <Link className="link-button" to="/finddoctor">
                back to search results
              </Link>
            </div>

            <div className="doctor-profile-header">
              <img src="/assets/dummyAvatar.png" alt="doctor" />
              <span className="doctor-profile-name">Segunmaru Faozan</span>
              <span className="doctor-profile-speciality">Pediatrician</span>
              <span className="doctor-profile-course">Chemistry Education</span>
            </div>
          </div>

          <div className="make-appointment-body">
            <span className="appointment-text">Select schedule</span>
            <div className="appointment-dates" id="appointmentDates">
              {Object.keys(result).map((date, index) => (
                <div
                  key={index}
                  className={`appointment-date ${
                    selectedDate === date ? "selected" : ""
                  }`}
                  onClick={() => setSelectedDate(date)}
                >
                  <span className="date-today">{date}</span>
                </div>
              ))}
            </div>

            {selectedDate && (
              <>
                <span className="appointment-text">Available time</span>
                <div className="appointment-times" id="appointmentTimes">
                  {result[selectedDate]?.times.map((time) => (
                    <div
                      key={time}
                      className={`appointment-time ${
                        selectedTime === time ? "selected" : ""
                      }`}
                      onClick={() => setSelectedTime(time)}
                    >
                      <span
                        className={`appointment-time ${
                          selectedTime === time ? "selected" : ""
                        }`}
                        onClick={() => setSelectedTime(time)}
                      >
                        {time}
                      </span>
                    </div>
                  ))}
                </div>
              </>
            )}

            <div className="appointment-text">Duration</div>
            <div className="appointment-durations">
              {["1 hour"].map((duration) => (
                <div
                  key={duration}
                  className={`appointment-duration ${
                    selectedDuration === duration ? "selected" : ""
                  }`}
                  onClick={() => setSelectedDuration(duration)}
                >
                  <span
                    className={`appointment-duration ${
                      selectedDuration === duration ? "selected" : ""
                    }`}
                  >
                    {duration}
                  </span>
                </div>
              ))}
            </div>

            <div className="make-notes-container">
              <label htmlFor="text">Note for the doctor</label>
              <textarea
                name="text"
                cols="30"
                width="100%"
                onChange={(e) => setNotes(e.target.value)}
              ></textarea>
            </div>

            <button
              className="appointment-book-appointment"
              onClick={(e) => handleSubmit(e, id, +duration, parsedDate, notes)}
            >
              {isLoading ? "Loading ..." : "Book appointment"}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default MakeAppointment;
