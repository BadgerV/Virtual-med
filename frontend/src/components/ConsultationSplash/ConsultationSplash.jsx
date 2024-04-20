import "./consultationSplash.css";
import { useNavigate } from "react-router-dom";

const ConsultationSplash = () => {
  const navigate = useNavigate();
  return (
    <div className="consultation">
      <div className="consultation-left">
        <div className="consultation-header">Appointments</div>

        <span className="consultation-big-text">
          One on one consultation with a licensed doctor anytime at your request
        </span>
        <span className="consultation-small-text">
          Our doctors specialize in providing tailored solutions to address your
          unique challenges. With our thorough vetting system, you can be rest
          assured you’re getting help from well qualified and experienced health
          personnel.
        </span>

        <div className="consultation-together ex-mt">
          <img src="/assets/mark-icon.png" alt="mark" />
          <span>100% Expert Doctors</span>
        </div>

        <div className="consultation-together">
          <img src="/assets/mark-icon.png" alt="mark" />
          <span>Instant appoitnments</span>
        </div>

        <button
          className="find-doctor_consultation"
          onClick={() => navigate(`/finddoctor`)}
        >
          Find Doctor
        </button>
      </div>
      <div className="consultation-right">
        <img src="/assets/doctor-image-2.png" alt="" />
      </div>
    </div>
  );
};

export default ConsultationSplash;

//107