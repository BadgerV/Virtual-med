import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDoctors } from "../../redux/doctors/DoctorsSlice";

const Home = () => {
  const dispatch = useDispatch();
  const doctors = useSelector((state) => state.doctorSlice.doctors);

  useEffect(() => {
    const fetchDoctors = async () => {
      console.log("blast off")
      await dispatch(getDoctors());
    };

    fetchDoctors();
  }, []);
  return (
    <>
      <div>First</div>
      <div>Firstb</div>
      <div>First</div>
      <div>First</div>
      <div>First</div>
      <div>First</div>
      <div>First</div>

      {doctors?.map((doctor, index) => {
        return <h1 key={index}>{doctor.email}</h1>;
      })}
    </>
  );
};

export default Home;
