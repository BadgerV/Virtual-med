import SimpleAndFast from "../../components/SimpleAndFast/SimpleAndFast";
import "./Home.css";
import { useState, useEffect } from "react";

const Home = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [imageSource, setImageSource] = useState("");

  // Function to update the image source based on window size
  const updateImageSource = () => {
    const width = window.innerWidth;
    console.log(width)

    // Set different image sources based on window size
    if (width < 987) {
      setImageSource("/assets/hero-image-smaller.png");
    } else if (width >= 768 && width < 1024) {
      setImageSource("/assets/hero-image.png");
    } else {
      setImageSource("/assets/hero-image.png");
    }
  };

  // Update the image source on component mount and window resize
  useEffect(() => {
    updateImageSource();

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
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
          <img src={imageSource} alt="Hero Image" />
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
