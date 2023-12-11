import { useSelector } from "react-redux";
import "./appointmentCard.css";
import { useEffect, useState } from "react";
import { formatDate, truncateString } from "../../utils/helper";
import LoadingComponennt from "../LoadingComponent/LoadingComponent";
import { useNavigate } from "react-router-dom";

const AppointmentCard = ({ props }) => {
  const navigate = useNavigate();
  const loading = useSelector(
    (state) => state.appointmentSlice.loadingAppointment
  );

  const [appointmentTime, setAppointmentTime] = useState(props.appointmentTime);
  const [doctorId, setDoctorId] = useState(props.doctorId);
  const [patientId, setPatientId] = useState(props.patientId);
  const [notes, setNotes] = useState(props.notes);
  const [status, setStatus] = useState(props.status);
  const [chatId, setChatId] = useState(props.chatId);

  useEffect(() => {
    if (!loading) {
      setAppointmentTime(props.appointmentTime);
      setDoctorId(props.doctorId);
      setPatientId(props.patientId);
      setNotes(props.notes);
      setStatus(props.status);
      setChatId(props.chatId);
    }
  }, [
    loading,
    props.appointmentTime,
    props.doctorId,
    props.patientId,
    props.notes,
    props.status,
    props.chatId,
  ]);

  const handleOngoingAppointments = (chatId) => {
    navigate(`/chat/${chatId}`);
  };

  const user = useSelector((state) => state.userSlice?.user);
  const staff = useSelector((state) => state.formSlice?.staff);

  const [isUser, setIsUser] = useState(true);

  useEffect(() => {
    if (user.accountType === "staff") {
      setIsUser(false);
    } else {
      setIsUser(true);
    }
  }, [user]);

  useEffect(() => {
    if (staff) {
      setIsUser(false);
    }
  }, [staff]);
  return (
    <>
      {loading ? (
        <LoadingComponennt />
      ) : (
        <>
          {isUser ? (
            <div
              className="appointment-card"
              onClick={() => handleOngoingAppointments(chatId)}
            >
              <div className="apapointment-card-left">
                <img
                  src={doctorId?.passportImage}
                  alt=""
                  className="appointment-left-img"
                />
              </div>
              <div className="apapointment-card-middle">
                <span className="appointment-name">
                  Dr. {doctorId?.firstName} {doctorId?.lastName}
                </span>
                <span className="appointment-profession">
                  {doctorId?.major}
                </span>
                <span className="appointment-date-card">
                  {appointmentTime ? formatDate(appointmentTime) : ""}
                </span>

                {/* <div className="appointment-card__buttons">
              <button className="appointment-card__button appointment-card__button1">
                Book again
              </button>
              <button className="appointment-card__button appointment-card__button2">
                Leave review
              </button>
            </div> */}
              </div>
              {status == "started" ? (
                <div className="apapointment-card-right">
                  <img src="/assets/video-icon-img.svg" alt="" />
                </div>
              ) : (
                <></>
              )}
            </div>
          ) : (
            <div
              className="appointment-card"
              onClick={() => handleOngoingAppointments(chatId)}
            >
              {/* <div className="apapointment-card-left">
            <img src="/assets/avatar-fake-img.png" alt="" />
          </div> */}
              <div className="apapointment-card-middle">
                <span className="appointment-name">
                  {patientId?.firstName} {patientId?.lastName}
                </span>
                <span className="appointment-date">
                  {appointmentTime ? formatDate(appointmentTime) : ""}{" "}
                </span>

                {/* <div className="appointment-card__buttons">
              <button className="appointment-card__button appointment-card__button1">
                Book again
              </button>
              <button className="appointment-card__button appointment-card__button2">
                Leave review
              </button>
            </div> */}

                <div className="notes-container">
                  <span>
                    <span className="inbold">Patient's note:</span>{" "}
                    {notes ? truncateString(notes, 40) : ""}
                  </span>
                </div>
              </div>
              {String(status) === "started" ? (
                <div className="apapointment-card-right">
                  <img src="/assets/video-icon-img.svg" alt="" />
                </div>
              ) : (
                <></>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default AppointmentCard;
