import "./doctorCard.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const DoctorCard = ({
  _id,
  firstName,
  lastName,
  email,
  major,
  rating,
  noOfRatings,
  speciality,
  passportImage,
}) => {
  const navigate = useNavigate();
  return (
    <div
      className="doctor-card-container"
      onClick={() => navigate(`/doctor/${_id}`)}
    >
      <div className="doctor-card-left">
        <img
          src={passportImage ? passportImage : "/assets/doctorImage.png"}
          alt=""
        />
      </div>
      <div className="doctor-card-middle">
        <span className="doctor-card_name">{`${firstName} ${lastName}`}</span>
        <span className="doctor-card_speciality">{speciality}</span>
        <span className="doctor-course">{major}</span>
        <div className="doctor-card_rating-container">
          <img src="/assets/star.png" alt="" className="star" />
          <span>
            {rating ? `${rating} (${noOfRatings} reviews)` : "no ratings yet"}
          </span>
        </div>
      </div>
      <div className="doctor-card-right">
        <Link to={`/doctor/${_id}`} className="link-button">
          View
        </Link>
      </div>
    </div>
  );
};

export default DoctorCard;
