import "./makeAppointment.css";
import { Link } from "react-router-dom";

const MakeAppointment = () => {
  return (
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
        <div className="appointment-dates">
          <div className="appointment-date">
            <span className="date-today">Today</span>
            <span className="date-date-today">4 Dec</span>
          </div>
          <div className="appointment-date">
            <span className="date-today">Teusday</span>
            <span className="date-date-today">5 Dec</span>
          </div>
          <div className="appointment-date">
            <span className="date-today">Wednesday</span>
            <span className="date-date-today">6 Dec</span>
          </div>
          <div className="appointment-date">
            <span className="date-today">Thursday</span>
            <span className="date-date-today">7 Dec</span>
          </div>
        </div>
        <span className="appointment-text">Available time</span>
        <div className="appointment-times">
          <span className="appointment-time">10:00am</span>
          <span className="appointment-time">12:00 noon</span>
          <span className="appointment-time">01:00pm</span>
          <span className="appointment-time">02:00pm</span>
          <span className="appointment-time">03:00pm</span>
          <span className="appointment-time">04:00pm</span>
          <span className="appointment-time">05:00pm</span>
        </div>

        <div className="appointment-text">Duration</div>

        <div className="appointment-durations">
          <span className="appointment-duration">1 hour</span>
          <span className="appointment-duration">2 hours</span>
        </div>
      </div>

      <button className="appointment-book-appointment">Book appointment</button>
    </div>
  );
};

export default MakeAppointment;
