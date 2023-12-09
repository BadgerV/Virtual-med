import "./services.css";

const Services = () => {
  return (
    <div className="services">
      <div className="services-header">Our Servcies</div>

      <div className="services-big-text">
        You can get the highest quality service here
      </div>

      <div className="different-services">
        <div className="different-service">
          <span className="different-services-header">
            Prescription Services
          </span>
          <span className="different-services-body">
            Need prescription? Our medical personnel can write you a
            prescription, making it it easy for you to access necessary
            medications.
          </span>
        </div>
        <div className="different-service">
          <span className="different-services-header">
            Telemedicine Consultations
          </span>
          <span className="different-services-body">
            Speak with a healthcare professional via chat or phone calls and get
            the help you need at your convenience.
          </span>
        </div>
        <div className="different-service">
          <span className="different-services-header">
            Mental Health Support
          </span>
          <span className="different-services-body">
            Your mental health is just as important as your physical health. Our
            specialists are here to provide the guidance and support you need.
          </span>
        </div>
      </div>
    </div>
  );
};

export default Services;
