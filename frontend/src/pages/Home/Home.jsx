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
        <h1>We provide digital<br/> healthcare for everyone, <br/>anywhere</h1>

        <span>
          At VirtualMed, we strongly believe that everyone deserves access to<br />
          top-notch medical care, regardless of their location or schedule.
        </span>

        <img src="*" alt="small doctors.png" />

        <SwitchableButtons />
        </div>

        <div className="left">
          <img src="/assets/code.png" alt="" />
        </div>

        {/* {doctors?.map((doctor, index) => {
        return <h1 key={index}>{doctor.email}</h1>;
      })} */}
      
    </div>
  );
};

export default Home;
