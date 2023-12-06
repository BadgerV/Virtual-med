import "./doctorProfile.css";
import Rating from "../../components/Rating/Rating";
import "./doctorProfile.css";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getDoctor } from "../../redux/doctors/DoctorsSlice";
import LoadingComponennt from "../../components/LoadingComponent/LoadingComponent";
import { Link } from "react-router-dom";

const DoctorProfile = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.doctorSlice.loading);
  const foundDoctor = useSelector((state) => state.doctorSlice.foundDoctor);

  const id = params.id;

  // console.log(id)

  const fetchDoctorData = async () => {
    await dispatch(getDoctor(id));
  };
  useEffect(() => {
    console.log(id)
    fetchDoctorData();
  }, [id]);

  return (
    <>
      {isLoading ? (
        <LoadingComponennt />
      ) : (
        <div className="doctor-profile-page">
          <div className="going-back">
            <img src="/assets/arrow-back.svg" alt="back" />
            <Link className="link-button" to="/finddoctor">
              back to search results
            </Link>
          </div>

          <div className="doctor-profile-header">
            <img src={foundDoctor?.passportImage} alt="doctor" />
            <span className="doctor-profile-name">{`${foundDoctor?.firstName} ${foundDoctor?.lastName}`}</span>
            <span className="doctor-profile-speciality">{foundDoctor.speciality}</span>
            <span className="doctor-profile-course">{`${foundDoctor?.major}`}</span>
          </div>

          <div className="profile-doctor-attributes">
            <div className="profile-doctor-attribute">
              <img src="/assets/users-icon.svg" alt="" />
              <span className="profile-doctor-colored-text">
                {foundDoctor?.allPatients.length === 0
                  ? "No patients yet"
                  : foundDoctor?.allPatients.length}
              </span>
              <span className="profile-doctor-grey-text">
                {foundDoctor?.allPatients.length > 0 && "Patients"}
              </span>
            </div>
            <div className="profile-doctor-attribute special-attribute">
              <img src="/assets/suitcase-icon.svg" alt="" />
              <span className="profile-doctor-colored-text">
                {foundDoctor?.yearsOfExperience}
              </span>
              <span className="profile-doctor-grey-text">Experience</span>
            </div>
            <div className="profile-doctor-attribute">
              <img src="/assets/star-icon.svg" alt="" />
              <span className="profile-doctor-colored-text">
                {foundDoctor?.rating ? foundDoctor?.rating : "No ratings yet"}
              </span>
              <span className="profile-doctor-grey-text">
                {foundDoctor?.rating && "rating"}
              </span>
            </div>
          </div>

          <div className="profile-doctor-button-container">
            <button className="profile-doctor-book-appointment">
              Book Appointment
            </button>
          </div>

          <div className="profile-doctor-main">
            <div className="profile-doctor-sub-header">
              <span>About</span>
              <span>Location</span>
              <span>Education and Background</span>
              <span>Reviews</span>
            </div>
            <div className="profile-doctor_together">
              <span className="profile-doctor_about-text">About</span>
              <span className="profile-doctor_about-body">
                {foundDoctor?.aboutMe}
              </span>
            </div>

            <div className="profile-doctor_together">
              <span className="profile-doctor_location-text">Location</span>
              <span className="profile-doctor_location">
                {foundDoctor?.location}
              </span>
            </div>

            <span className="profile-doctor_education-text">
              Education and Background
            </span>

            <div className="profile-doctor_together">
              <span className="profile-doctor-attribute-big-text">
                Specialties
              </span>
              <span className="profile-doctor-attribute-small-text">
                {foundDoctor?.speciality}
              </span>
            </div>

            <div className="profile-doctor_together">
              <span className="profile-doctor-attribute-big-text">
                Education and Training
              </span>
              <span className="profile-doctor-attribute-small-text">
                {foundDoctor?.university}
              </span>
            </div>

            <div className="profile-doctor_together">
              <span className="profile-doctor-attribute-big-text">
                Languages Spoken
              </span>
              <span className="profile-doctor-attribute-small-text">
                English
              </span>
              {/* <span className="profile-doctor-attribute-small-text">Hindi</span> */}
            </div>

            {/* <div className="profile-doctor_together">
              <span className="profile-doctor-attribute-big-text">Gender</span>
              <span className="profile-doctor-attribute-small-text">Male</span>
            </div> */}
          </div>

          <div className="profile-doctor-review-container">
            <div className="profile-doctor-review_header">
              <div className="profile-doctor-review_header-left">
                <span className="profile-review-big-text">Review</span>
                <span className="profile-review-small-text">
                  All reviews have been submitted by patients only after seeing
                  the provider.
                </span>
              </div>
              <div className="profile-doctor-review_header-right">
                {foundDoctor?.rating ? (
                  <>
                    <div className="profile-doctor-review_header-right-top">
                      <span>Overall ratings (720)</span>
                    </div>
                    <div className="profile-doctor-review_header-right-bottom">
                      <img src="/assets/star.png" alt="" />
                      <span>4.8</span>
                    </div>
                  </>
                ) : (
                  "No ratings yet"
                )}
              </div>
            </div>

            <div
              className="rating-container"
              style={
                !foundDoctor?.rating && {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }
              }
            >
              {foundDoctor?.rating ? (
                Array.from({ length: foundDoctor?.rating }, (_, index) => (
                  <Rating props={foundDoctor?.rating} key={index} />
                ))
              ) : (
                <span style={{ color: "#d3d3d3" }}>No ratings yet</span>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DoctorProfile;
