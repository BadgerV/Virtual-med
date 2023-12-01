import "./doctorCard.css";

const DoctorCard = () => {
  return (
    <div className="doctor-card-container">
      <div className="doctor-card-left">
        <img src="/assets/doctorImage.png" alt="" />
      </div>
      <div className="doctor-card-middle">
        <span className="doctor-card_name">Dr. Rajesh Koothropalli</span>
        <span className="doctor-card_speciality">Optician</span>
        <span className="doctor-course">MBBS</span>
        <div className="doctor-card_rating-container">
            <img src="/assets/star.png" alt="" className="star"/>
            <span>4.8 (720 reviews)</span>
        </div>
      </div>
      <div className="doctor-card-right">
        <button className="doctor-card_view-button">
            View
        </button>
      </div>
    </div>
  );
};

export default DoctorCard;
