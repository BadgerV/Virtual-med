import SimpleAndFast from "../../components/SimpleAndFast/SimpleAndFast";
import "./Home.css";

const Home = () => {
  return (
    <>
      <div className="home">
        <div className="home-left">
          <span className="home-big-text">
            We provide digital healthcare for everyone, anywhere
          </span>

          <span className="home-small-text">
            At VirtualMed, we strongly believe that everyone deserves access to
            top-notch medical care, regardless of their location or schedule.
          </span>

          <div className="absolute-container">
            <img src="/assets/ellipse-1.png" alt="doctor" />
            <img
              src="/assets/ellipse-2.png"
              alt="doctor"
              className="minus-margin"
            />
            <img
              src="/assets/ellipse-3.png"
              alt="doctor"
              className="minus-margin"
            />
            <img
              src="/assets/ellipse-4.png"
              alt="doctor"
              className="minus-margin"
            />

            <div className="absolute-cont-end-div">
              <span className="home-first-text">50+</span>
              <span className="home-second-text">Competent Doctors</span>
            </div>
          </div>

          <div className="home-button-div">
            <button className="home-first-button">Book appointment</button>
            <button className="home-second-button">
              Get Started <img src="/assets/right-arrow.png" alt="" />
            </button>
          </div>
        </div>
        <div className="home-right">
          <img src="/assets/hero-image.png" alt="Hero Image" />
        </div>
      </div>

      <div className="fast-and-simple-outer-container">
        <div className="fast-and-simple-container">
          <SimpleAndFast />
        </div>
      </div>
    </>
  );
};

export default Home;
