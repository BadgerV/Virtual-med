import { useState } from "react";
import "./SignUpPatient.css";

const SignupPage = () => {
  // const [showDoctorSignup, setShowDoctorSignup] = useState(true);
  // const [showPatientSignup, setShowPatientSignup] = useState(false);
  const [isUser, setIsUser] = useState(true);

  const handleDoctorClick = () => {
    setIsUser(false);
    // console.log("worig");
    // You can also scroll to the doctor signup section here
  };

  const handlePatientClick = () => {
    setIsUser(true);
    // console.log("worig");

    // You can also scroll to the patient signup section here
  };

  return (
    <div className="signs-doctors">
      <div className="signs-container">
        <div className="sign-in-header">
          <h1>Welcome!</h1>
          <span>Please select account type</span>
        </div>

        <div className="signs-button">
          <button
            onClick={handlePatientClick}
            style={
              isUser
                ? {
                    borderBottom: "2px solid blue ",
                    color: "#023382",
                    fontWeight: "500",
                  }
                : {}
            }
          >
            Patient
          </button>
          <button
            onClick={handleDoctorClick}
            style={
              !isUser
                ? {
                    borderBottom: "2px solid blue ",
                    color: "#023382",
                    fontWeight: "500",
                  }
                : {}
            }
          >
            Doctor
          </button>
        </div>

        <div className="form-container">
          <div className="sign-in-form">
            <form>
              <label htmlFor="">Name</label>
              <div className="form-input">
                <img src="/assets/Envelope.svg" alt="" />
                <input type="name" name="name" placeholder="First name" />
              </div>
              <label htmlFor="">Name</label>
              <div className="form-input">
                <img src="/assets/Envelope.svg" alt="" />
                <input type="name" name="name" placeholder="Last name" />
              </div>

              <label htmlFor="">Email address</label>
              <div className="form-input">
                <img src="/assets/Envelope.svg" alt="" />
                <input type="email" name="email" placeholder="Email" />
              </div>

              <label htmlFor="">Phone Number</label>
              <div className="form-input">
                <img src="/assets/Envelope.svg" alt="" />
                <input
                  type="text"
                  name="phoneNumber"
                  placeholder="Phone number"
                />
              </div>

              <label htmlFor="">Password</label>
              <div className="form-input">
                <img src="/assets/Lock.svg" alt="" />

                <input
                  type="passsword"
                  name="password"
                  placeholder="Password"
                />
                <img src="/assets/Vector (5).svg" alt="" />
              </div>

              <label htmlFor="">Confirm Password</label>
              <div className="form-input">
                <img src="/assets/Lock.svg" alt="" />
                <input
                  type="passsword"
                  name="password"
                  placeholder="Confirm Password"
                />
                <img src="/assets/Vector (5).svg" alt="" />
              </div>

              <div className="terms">
                <input type="checkbox" />
                <span>I agree to the Terms & Privacy</span>
              </div>

              <div className="sign-buttondiv">
                <button className="sign-button">Sign up</button>
              </div>
            </form>
          </div>

          <div className="sign-in-footer">
            <span>Already have an account?</span>{" "}
            <a href="/signin" className="ball">
              Sign In
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;

// mann
