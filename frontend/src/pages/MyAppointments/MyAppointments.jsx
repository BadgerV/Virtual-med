import { useEffect, useState } from "react";
import AppointmentCard from "../../components/AppointmentCard/AppointmentCard";
import "./myAppointments.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getCompletedAppointments,
  getOngoingAppointment,
  getUpcomingAppointment,
} from "../../redux/appointment/appointmentSlice";
import LoadingComponennt from "../../components/LoadingComponent/LoadingComponent";
import { Navigate, useNavigate } from "react-router-dom";

const MyAppointments = () => {
  const [selected, setSelected] = useState(1);

  return (
    <div className="appointment-page">
      <div className="appointment-page__header">Appointments</div>

      <div className="appointment-headers">
        <span
          style={selected === 1 ? { borderBottom: "2px solid #023382" } : {}}
          onClick={() => setSelected(1)}
        >
          Upcoming
        </span>
        <span
          style={selected === 2 ? { borderBottom: "2px solid#023382" } : {}}
          onClick={() => setSelected(2)}
        >
          Ongoing
        </span>
        <span
          style={selected === 3 ? { borderBottom: "2px solid #023382" } : {}}
          onClick={() => setSelected(3)}
        >
          Completed
        </span>
      </div>

      <div className="appointment-page-main">
        {selected === 1 && <UpcomingAppointments />}

        {selected === 2 && <OnGoingAppointments />}

        {selected === 3 && <CompletedAppointments />}
      </div>
    </div>
  );
};

export default MyAppointments;

const UpcomingAppointments = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAppointments = async () => {
      await dispatch(getUpcomingAppointment());
    };
    getAppointments();
  }, []);

  const upcomingAppointments = useSelector(
    (state) => state.appointmentSlice?.upcomingAppointments
  );

  useEffect(() => {
    if (upcomingAppointments !== null) {
      console.log(typeof upcomingAppointments);
      setLoading(false);
    }
  }, [upcomingAppointments]);

  return (
    <>
      {loading ? (
        <LoadingComponennt />
      ) : (
        <div className="app-doctor-card-container">
          <span className="appointment-span">Upcoming appointments</span>
          {typeof upcomingAppointments === "string" ? (
            <>
              <span>{upcomingAppointments}</span>
            </>
          ) : (
            upcomingAppointments.map((appointment, index) => {
              return <AppointmentCard key={index} props={appointment} />;
            })
          )}
        </div>
      )}
    </>
  );
};

const OnGoingAppointments = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const getAppointments = async () => {
      await dispatch(getOngoingAppointment());
    };
    getAppointments();
  }, []);

  const ongoingAppointments = useSelector(
    (state) => state.appointmentSlice?.ongoingAppointments
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (ongoingAppointments !== null) {
      console.log(ongoingAppointments);
      setLoading(false);
    }
  }, [ongoingAppointments]);

 

  return (
    <>
      {loading ? (
        <LoadingComponennt />
      ) : (
        <div className="app-doctor-card-container">
          <span className="appointment-span">Ongoing appointments</span>

          {typeof ongoingAppointments === "string" ? (
            <>
              <span>{ongoingAppointments}</span>
            </>
          ) : (
            ongoingAppointments.map((appointment, index) => {
              return (
                <AppointmentCard
                  key={index}
                  props={appointment}
                />
              );
            })
          )}
        </div>
      )}
    </>
  );
};

const CompletedAppointments = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getCompletedAppointmentsData = async () => {
      await dispatch(getCompletedAppointments());
    };
    getCompletedAppointmentsData();
  }, []);

  const completedAppointments = useSelector(
    (state) => state.appointmentSlice.completedAppointments
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (completedAppointments !== null) {
      console.log(completedAppointments);
      setLoading(false);
    }
  }, [completedAppointments]);

  return (
    <>
      {loading && <LoadingComponennt />}
      {!loading && (
        <div className="app-doctor-card-container">
          <span className="appointment-span">Completed appointments</span>

          {typeof completedAppointments === "string" ? (
            <>
              <span>{completedAppointments}</span>
            </>
          ) : (
            completedAppointments.map((appointment, index) => {
              return <AppointmentCard key={index} props={appointment} />;
            })
          )}
        </div>
      )}
    </>
  );
};
