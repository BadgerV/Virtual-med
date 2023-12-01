import "./doctorProfile.css";
import Rating from "../../components/Rating/Rating";
import "./doctorProfile.css";

const DoctorProfile = () => {
  const staticData = [1, 2, 3];
  return (
    <div className="doctor-profile-page">
      <div className="going-back">
        <img src="/assets/arrow-back.svg" alt="back" />
        <span>back to search results</span>
      </div>

      <div className="doctor-profile-header">
        <img src="/assets/doctor-image.jpg" alt="doctor" />
        <span className="doctor-profile-name">Dr Rajesh Koothropalli</span>
        <span className="doctor-profile-speciality">General Physician</span>
        <span className="doctor-profile-course">MBBS</span>
      </div>

      <div className="profile-doctor-attributes">
        <div className="profile-doctor-attribute">
          <img src="/assets/users-icon.svg" alt="" />
          <span className="profile-doctor-colored-text">800+</span>
          <span className="profile-doctor-grey-text">Patients</span>
        </div>
        <div className="profile-doctor-attribute special-attribute">
          <img src="/assets/suitcase-icon.svg" alt="" />
          <span className="profile-doctor-colored-text">12+</span>
          <span className="profile-doctor-grey-text">Experience</span>
        </div>
        <div className="profile-doctor-attribute">
          <img src="/assets/star-icon.svg" alt="" />
          <span className="profile-doctor-colored-text">4.8+</span>
          <span className="profile-doctor-grey-text">Rating</span>
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
            Lorem ipsum dolor sit amet consectetur. Arcu massa tincidunt
            pellentesque congue quam odio aliquam. Turpis dui nec amet nam massa
            dolor ridiculus. Nunc in ullamcorper eu rhoncus vitae. Blandit
            ultrices eleifend euismod ultricies lorem ac. Malesuada pharetra
            lorem eu non enim ut. Orci integer ultricies ornare duis cursus
            amet. Vitae eu proin sit commodo volutpat consequat sit ultrices.
            Accumsan iaculis fringilla massa nulla arcu in penatibus fringilla.
            Quis tincidunt donec nisi sit imperdiet mauris venenatis. Vulputate
            in auctor et vestibulum nibh augue. Amet varius orci congue ornare
            augue. Pellentesque luctus nibh turpis ut bibendum vitae tristique
            dictum. Lacinia feugiat facilisi dignissim ut facilisis. Lacus
            scelerisque in nunc tortor id sit nunc commodo. Semper risus
            pellentesque velit eros nec ullamcorper ut hendrerit. Pellentesque
            cursus euismod risus ac. Mi vitae eget duis in sit a auctor. Augue
            auctor pulvinar viverra lectus donec vitae ut aliquet gravida. Nunc
            feugiat tempus in facilisis lacus. Ut varius suscipit pellentesque
            nunc volutpat sit. Amet vulputate nunc id dolor pellentesque nec et.
            Tincidunt justo bibendum nunc sed id mattis dignissim. Sed mi nisl
            vel velit turpis. Fermentum gravida orci eget proin facilisis
            facilisi mauris sed ipsum.
          </span>
        </div>

        <div className="profile-doctor_together">
          <span className="profile-doctor_location-text">Location</span>
          <span className="profile-doctor_location">
            Prestige Specialist Clinic <br />
            New York, NY, United States
          </span>
        </div>

        <span className="profile-doctor_education-text">
          Education and Backgrounc
        </span>

        <div className="profile-doctor_together">
          <span className="profile-doctor-attribute-big-text">Specialties</span>
          <span className="profile-doctor-attribute-small-text">Optician</span>
        </div>

        <div className="profile-doctor_together">
          <span className="profile-doctor-attribute-big-text">
            Education and Training
          </span>
          <span className="profile-doctor-attribute-small-text">
            University of Lagos
          </span>
        </div>

        <div className="profile-doctor_together">
          <span className="profile-doctor-attribute-big-text">
            Languages Spoken
          </span>
          <span className="profile-doctor-attribute-small-text">English</span>
          <span className="profile-doctor-attribute-small-text">Hindi</span>
        </div>

        <div className="profile-doctor_together">
          <span className="profile-doctor-attribute-big-text">Gender</span>
          <span className="profile-doctor-attribute-small-text">Male</span>
        </div>
      </div>

      <div className="profile-doctor-review-container">
        <div className="profile-doctor-review_header">
          <div className="profile-doctor-review_header-left">
            <span className="profile-review-big-text">Review</span>
            <span className="profile-review-small-text">
              All reviews have been submitted by patients only after seeing the
              provider.
            </span>
          </div>
          <div className="profile-doctor-review_header-right">
            <div className="profile-doctor-review_header-right-top">
              <span>Overall ratings (720)</span>
            </div>
            <div className="profile-doctor-review_header-right-bottom">
              <img src="/assets/star.png" alt="" />
              <span>4.8</span>
            </div>
          </div>
        </div>

        <div className="rating-container">
          {staticData.map((review, index) => {
            return <Rating props={review} key={index} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
