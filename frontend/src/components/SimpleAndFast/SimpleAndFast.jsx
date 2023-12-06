import "./simpleAndFast.css";

const SimpleAndFast = () => {
  return (
    <div>
      <div className="simple-and-fast">
        <span className="simple-and-fast-header-text">Simple & Fast</span>
        <span className="simple-and-fast-first-text">
          4 easy steps to get your desired care and treatment
        </span>

        <div className="fast-list-of-services">
          <div className="fast-list-service">
            <img src="/assets/services-svg-1.svg" alt="" />

            <div className="services-smaller-div">
              <span className="services-smaller-header">
                Check Doctor’s Profile
              </span>

              <span className="smaller-text">
                Browse through our extensive catalog of experienced and
                qualified medical practitioners.
              </span>
            </div>
          </div>
          <div className="fast-list-service">
            <img src="/assets/services-svg-2.svg" alt="" />
            <div className="services-smaller-div">
              <span className="services-smaller-header">
                Request Consultation
              </span>

              <span className="smaller-text">
                Book a virtual appointment with your desired healthcare
                personnel on our platform in just 3 easy steps.
              </span>
            </div>
          </div>
          <div className="fast-list-service">
            <img src="/assets/services-svg-3.svg" alt="" />
            <div className="services-smaller-div">
              <span className="services-smaller-header">
                Receive Consultation
              </span>

              <span className="smaller-text">
                Have a virtual one on one consultation with your preferred
                doctor at your convenience.
              </span>
            </div>
          </div>
          <div className="fast-list-service full-span-service">
            <img src="/assets/services-svg-4.svg" alt="" />
            <div className="services-smaller-div">
              <span className="services-smaller-header">
                Get your desired help
              </span>

              <span className="smaller-text">
                Get your desired solution, prescription or referral from our
                doctors from the comfort of your own space!
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleAndFast;
