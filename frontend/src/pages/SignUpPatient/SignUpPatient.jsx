import React from "react";
import { useState } from "react";
import "./SignUpPatient.css";

const SignupPage = () => {
  const [showDoctorSignup, setShowDoctorSignup] = useState(false);
  const [showPatientSignup, setShowPatientSignup] = useState(false);

  const handleDoctorClick = () => {
    setShowDoctorSignup(true);
    setShowPatientSignup(false);
    // You can also scroll to the doctor signup section here
  };

  const handlePatientClick = () => {
    setShowDoctorSignup(false);
    setShowPatientSignup(true);
    // You can also scroll to the patient signup section here
  };

  return (
    <div>
      <div className="signs">
        <button onClick={handleDoctorClick}>Doctors</button>
        <button onClick={handlePatientClick}>Patients</button>
      </div>

      <div style={{ display: showDoctorSignup ? "block" : "none" }}>
        <h2 className="nann">Doctor Signup</h2>
        <div className="sign-ins">
          <div className="sign-in-header">
            <h1>Welcome back!</h1>
            <span>Please sign into your account</span>
          </div>

          <div className="sign-in-form">
            <form>
              <label htmlFor="">Name</label>
              <div className="form-input">
                <input type="name" name="name" />
              </div>

              <label htmlFor="">Email address</label>
              <div className="form-input">
                <img src="/assets/Envelope.svg" alt="" />
                <input type="email" name="email" />
              </div>

              <label htmlFor="">Password</label>
              <div className="form-input">
                <img src="/assets/Lock.svg" alt="" />
                <input type="passsword" name="password" />
                <img src="/assets/Vector (5).svg" alt="" />
              </div>

              <label htmlFor="">Confirm Password</label>
              <div className="form-input">
                <img src="/assets/Lock.svg" alt="" />
                <input type="passsword" name="password" />
                <img src="/assets/Vector (5).svg" alt="" />
              </div>

              <div className="terms">
                <input type="checkbox" />
                <span>I agree to the Terms & Privacy</span>
              </div>

              <div className="sign-buttondiv">
                <button className="sign-button">Sign Up</button>
              </div>
            </form>
          </div>

          <div className="sign-in-footer">
            <span>
              Already have an account?{" "}
              <a href="/signin" className="ball">
                Sign In
              </a>
            </span>
          </div>
        </div>
      </div>

      <div style={{ display: showPatientSignup ? "block" : "none" }}>
        <h2 className="nann">Patient Signup</h2>
        {/* Patient signup form goes here */}
      </div>
      <div className="sign-ins">
          <div className="sign-in-header">
            <h1>Welcome back!</h1>
            <span>Please sign into your account</span>
          </div>

          <div className="sign-in-form">
            <form>
              <label htmlFor="">Name</label>
              <div className="form-input">
                <input type="name" name="name" />
              </div>

              <label htmlFor="">Email address</label>
              <div className="form-input">
                <img src="/assets/Envelope.svg" alt="" />
                <input type="email" name="email" />
              </div>

              <label htmlFor="">Password</label>
              <div className="form-input">
                <img src="/assets/Lock.svg" alt="" />
                <input type="passsword" name="password" />
                <img src="/assets/Vector (5).svg" alt="" />
              </div>

              <label htmlFor="">Confirm Password</label>
              <div className="form-input">
                <img src="/assets/Lock.svg" alt="" />
                <input type="passsword" name="password" />
                <img src="/assets/Vector (5).svg" alt="" />
              </div>

              <div className="terms">
                <input type="checkbox" />
                <span>I agree to the Terms & Privacy</span>
              </div>

              <div className="sign-buttondiv">
                <button className="sign-button">Sign Up</button>
              </div>
            </form>
          </div>

          <div className="sign-in-footer">
            <span>
              Already have an account?{" "}
              <a href="/signin" className="ball">
                Sign In
              </a>
            </span>
          </div>
        </div>
    </div>
  );
};

export default SignupPage;
