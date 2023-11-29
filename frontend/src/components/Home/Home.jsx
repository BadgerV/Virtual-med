import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDoctors } from "../../../redux/doctors/DoctorsSlice";

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

<h1>We provide digital 
healthcare for everyone, 
anywhere</h1>

<span>At VirtualMed, we strongly believe that everyone deserves access to 
top-notch medical care, regardless of their location or schedule.</span>
<image src="*" alt="small doctors.png" />


      {/* {doctors?.map((doctor, index) => {
        return <h1 key={index}>{doctor.email}</h1>;
      })} */}
       </div>
  );
};

export default Home;
