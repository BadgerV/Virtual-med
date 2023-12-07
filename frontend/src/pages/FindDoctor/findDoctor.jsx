import DoctorCard from "../../components/DoctorCard/DoctorCard";
import "./findDoctor.css";
import { getDoctors } from "../../redux/doctors/DoctorsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import LoadingComponennt from "../../components/LoadingComponent/LoadingComponent";

const FindDoctor = () => {
  const dispatch = useDispatch();

  const doctors = useSelector((state) => state.doctorSlice.doctors);
  const isLoading = useSelector((state) => state.doctorSlice.loading);

  const getListOfDoctors = async () => {
    await dispatch(getDoctors());
  };

  useEffect(() => {
    console.log("active");
    getListOfDoctors();
  }, []);

  useEffect(() => {
    console.log(doctors);
  }, [doctors]);

  return (
    <div className="find-doctor">
      <div className="find-doctor-header">
        <span className="find-doctor-text">
          Get your doctors appointment online
        </span>
        <span className="find-doctor-text">Get the care you need </span>
        <span className="find-doctor-small_text">
          Search through our extensive list of qualified and well vetted medical
          practitioners
        </span>

        <div className="find-doctor-header-input">
          <input
            className="find-doctor-input"
            type="text"
            placeholder="Search"
          />
          <img src="/assets/MagnifyingGlass.svg" alt="" />
        </div>
      </div>

      <div className="find-doctor-main">
        <div className="find-doctor-left">
          <span className="find-doctor_filter-text">Filter By</span>

          <div className="find-doctor-margin-adjust">
            <span className="find-doctor_speciality-text">Speciality</span>

            <div className="find-doctor-check_n_option">
              <input type="checkbox" />
              <span>All</span>
            </div>

            <div className="find-doctor-check_n_option">
              <input type="checkbox" />
              <span>Optician</span>
            </div>

            <div className="find-doctor-check_n_option">
              <input type="checkbox" />
              <span>Dermatologist</span>
            </div>

            <div className="find-doctor-check_n_option">
              <input type="checkbox" />
              <span>Dentist</span>
            </div>

            <div className="find-doctor-check_n_option">
              <input type="checkbox" />
              <span>Pediatrician</span>
            </div>

            <div className="find-doctor-check_n_option">
              <input type="checkbox" />
              <span>General Physician</span>
            </div>

            <div className="find-doctor-check_n_option">
              <input type="checkbox" />
              <span>Therapist</span>
            </div>
          </div>

          <span className="find-doctor_speciality-text">Location</span>
          <div className="find-doctor-margin-adjust">
            <div className="find-doctor-check_n_option">
              <input type="checkbox" />
              <span>Osun State</span>
            </div>

            <div className="find-doctor-check_n_option">
              <input type="checkbox" />
              <span>Lagos State</span>
            </div>
          </div>
        </div>
        <div className="find-doctor-right">
          {!isLoading ? (
            doctors.map((doctor, index) => {
              return <DoctorCard key={index} {...doctor} />;
            })
          ) : (
            <LoadingComponennt />
          )}
        </div>
      </div>
    </div>
  );
};

export default FindDoctor;
