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
      <div className="home-container">
        
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

          <div className="right-photo">
            <div className="home-last-images">
              <img src="/assets/Ellipse 1.png" alt="small doctors.png" />
              <img src="/assets/Ellipse 2.png" alt="small doctors.png" />
              <img src="/assets/Ellipse 3.png" alt="small doctors.png" />
              <img src="/assets/Ellipse 4.png" alt="small doctors.png" />
            </div>

            <div className="right-last">
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
      </div>


<div className="simple">
<div className="simple-header">
  <span>Simple & Fast</span>
  <h1>4 Easy Steps to get your desired care and treatment</h1>


{/* <div className="simple-box">

<div className="simple-boxes">
    <img src="assets/user-md_9856641 1.svg 1.svg" alt="" />
    <h1>Check Doctor's Profile</h1>
    <span>Browse through our extensive and experienced medical practitioners</span>
  </div>

  <div className="simple-boxes">
  <img src="/assets/schedule_1545407 1.svg" alt="" />
    <h1>Check Doctor's Profile</h1>
    <span>Browse through our extensive and experienced medical practitioners</span>
  </div>

  <div className="simple-boxes">
    <img src="assets/stethoscope_2480303 1.svg" alt="" />
    <h1>Check Doctor's Profile</h1>
    <span>Browse through our extensive and experienced medical practitioners</span>
  </div>

  <div className="simple-boxes">
    <img src="assets/positive-thinking_7660512 1.svg" alt="" />
    <h1>Check Doctor's Profile</h1>
    <span>Browse through our extensive and experienced medical practitioners</span>
    <span>man</span>
    <h1>vhsbfe</h1>
  </div>

</div> */}
</div>
</div>

{/* 
      <div className="last">
        <h1>Our Services</h1>

        <div className="last-all">
          <div className="last-first">
            <h2>Telemedicine Consultations</h2>
            <span>
              Speak with a healthcare professional
              <br /> via chat or phone calls and get the help you need at your
              convenience.
            </span>
          </div>

          <div className="last-first">
            <h2>Prescription Services</h2>
            <span>
              Need prescription? Our medical
              <br /> personnel can write you a prescription, making it it easy
              for you to access necessary medications.
            </span>
          </div>

          <div className="last-first">
            <h2>Mental health Support</h2>
            <span>
              Your mental health is just as important
              <br /> as your physical health. Our specialists are here to
              provide the guidance and support you need..
            </span>
          </div>
        </div>
      </div> */}

      {/* {doctors?.map((doctor, index) => {
        return <h1 key={index}>{doctor.email}</h1>;
      })} */}
    </div>
  );
};

export default Home;





