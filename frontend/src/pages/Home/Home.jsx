import "./Home.css";

import SwitchableButtons from "../../components/Button/Button";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";
// import { getDoctors } from "../../../redux/doctors/DoctorsSlice";

const Home = () => {
  // const dispatch = useDispatch();
  // const doctors = useSelector((state) => state.doctorSlice.doctors);

  // useEffect(() => {
  //   const fetchDoctors = async () => {
  //     console.log("blast off");
  //     await dispatch(getDoctors());
  //   };

  //   fetchDoctors();
  // }, []);

  // useEffect(() => {
  //   console.log(doctors);
  // }, [doctors]);
  return (
    <div className="home">
      <div className="right">
        <h1>
          We provide digital
          <br /> healthcare for everyone, <br />
          anywhere
        </h1>

        <span>
          At VirtualMed, we strongly believe that everyone deserves access to
          <br />
          top-notch medical care, regardless of their location or schedule.
        </span>

        <div className="home-last">
          <div className="home-last-images">
            <img src="/assets/Ellipse 1.png" alt="small doctors.png" />
            <img src="/assets/Ellipse 2.png" alt="small doctors.png" />
            <img src="/assets/Ellipse 3.png" alt="small doctors.png" />
            <img src="/assets/Ellipse 4.png" alt="small doctors.png" />
          </div>

          <div className="home-lasts">
            100 +<br />
            Competent Doctors
          </div>
        </div>

        <SwitchableButtons />
      </div>

      <div className="left">
        <div className="boxes">
          <div className="box">
            <img src="/assets/home-first.svg" />
            <span>Chat with Medical Professionals</span>
          </div>

          <div className="box">
            <img src="/assets/Stethoscope.svg" />
            <span>Schedule online appointment</span>
          </div>

          <div className="box">
            <img src="/assets/FolderLock.svg" />
            <span>Access your Medical History</span>
          </div>
        </div>

        <img
          src="/assets/doctor-presenting-something-isolated-white-background 1.png"
          alt=""
        />
      </div>


      <div className="last">
        
      </div>

      {/* {doctors?.map((doctor, index) => {
        return <h1 key={index}>{doctor.email}</h1>;
      })} */}
    </div>
  );
};

export default Home;
