import "./SignIn.css";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../../redux/user/UserSlice";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const isLoading = useSelector((state) => state.userSlice.loading);
  const user = useSelector((state) => state.userSlice.user);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await dispatch(loginUser(formData));
    // console.log(response.payload._id);

    if (response.payload._id) {
      navigate("/");
    }
  };

  return (
    <div className="sign-in">
      <div className="sign-in_container">
        <div className="sign-in-header">
          <h1>Welcome back!</h1>
          <span>Please sign in to your account to continue</span>
        </div>

        <div className="sign-in-form">
          <form onSubmit={(e) => handleSubmit(e)}>
            <label htmlFor="">Email address</label>
            <div className="form-input">
              <img src="/assets/Envelope.svg" alt="" />

              <input type="email" name="email" onChange={handleChange} />
            </div>

            <label htmlFor="">Password</label>
            <div className="form-input">
              <img src="/assets/Lock.svg" alt="" />
              <input type="passsword" name="password" onChange={handleChange} />
              <img src="/assets/Vector (5).svg" alt="" />
            </div>

            <div className="terms">
              <input type="checkbox" />
              <span>I agree to the Terms & Privacy</span>
            </div>

            <div className="sign-buttondiv">
              <button className="sign-button" disabled={isLoading}>
                Sign In
              </button>
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

<<<<<<< HEAD
        </form>
      </div>

      <div className="sign-in-footer">
        <span>
          Don't have an account? <a href="/signupforpatient" className="ball">Sign Up</a>
        </span>
        <a href="#">Forgot Password</a>
=======
        <div className="sign-in-footer">
          <span>
            Don't have an account?{" "}
            <a href="/signup" className="ball">
              Sign Up
            </a>
          </span>
          <a href="#">Forgot Password</a>
        </div>
>>>>>>> e4940758ada45dde05a87fc861ec176461e13426
      </div>
    </div>
  );
};

export default SignIn;
