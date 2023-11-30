import React from "react";
import "./SignIn.css";

const SignIn = () => {
  return (
    <div className="sign-in">
      <div className="sign-in-header">
        <h1>Welcome back!</h1>
        <span>Please sign into your account</span>
      </div>

      <div className="sign-in-form">
        <form>
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

          <div className="terms">
            <input type="checkbox" />
            <span>I agree to the Terms & Privacy</span>
          </div>

          <div className="sign-buttondiv">
            <button className="sign-button">Sign In</button>
          </div>

          <div className="or">
            <span>or</span>
          </div>

          <div className="twobtn">
            <button>
              <img src="/assets/flat-color-icons_google.svg" alt="" />
              <span>Continue with Google</span>
            </button>
            <button>
              <img src="/assets/Vector (7).svg" alt="" />
              <span>Continue with Apple</span>
            </button>
          </div>


        </form>
      </div>

      <div className="sign-in-footer">
        <span>
          Don't have an account? <a href="/signup" className="ball">Sign Up</a>
        </span>
        <a href="#">Forgot Password</a>
      </div>
    </div>
  );
};

export default SignIn;
