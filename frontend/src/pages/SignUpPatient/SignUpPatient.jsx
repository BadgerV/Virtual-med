import { useEffect, useState } from "react";
import "./SignUpPatient.css";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../../redux/user/UserSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignupPage = () => {
  const dispatch = useDispatch();

  const isError = useSelector((state) => state.userSlice.isError);
  const error = useSelector((state) => state.userSlice.error);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [isUser, setIsUser] = useState(true);

  const [canSeePassword, setCanSeePassword] = useState(false);

  const setIfCanSeePassword = () => {
    setCanSeePassword(!canSeePassword);
  };
  const handleDoctorClick = () => {
    setIsUser(false);
    navigate("/registerdoctor");
  };

  const handlePatientClick = () => {
    setIsUser(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const navigate = useNavigate();
  const user = useSelector((state) => state.userSlice.user);
  const isLoading = useSelector((state) => state.userSlice.loading);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(registerUser(formData));
  };

  useEffect(() => {
    if (user !== null && !user?.nickname) {
      navigate("/set-nickname");
    }
  }, [user]);

  useEffect(() => {
    if (isError) {
      throwToastifyError();
    }
  }, [isError]);

  const throwToastifyError = () => {
    notify();
    return;
  };

  const notify = () => toast.error(error);

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
              <label htmlFor="firstName">First Name</label>
              <div className="form-input">
                <img src="/assets/Envelope.svg" alt="" />
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="First name"
                />
              </div>
              <label htmlFor="lastName">Last Name</label>
              <div className="form-input">
                <img src="/assets/Envelope.svg" alt="" />
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Last name"
                />
              </div>

              <label htmlFor="email">Email address</label>
              <div className="form-input">
                <img src="/assets/Envelope.svg" alt="" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                />
              </div>

              <label htmlFor="phoneNumber">Phone Number</label>
              <div className="form-input">
                <img src="/assets/Envelope.svg" alt="" />
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="Phone number"
                />
              </div>

              <label htmlFor="password">Password</label>
              <div className="form-input">
                <img src="/assets/Lock.svg" alt="" />
                <input
                  type={canSeePassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                />
                <img
                  src="/assets/Vector (5).svg"
                  alt=""
                  onClick={setIfCanSeePassword}
                />
              </div>

              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="form-input">
                <img src="/assets/Lock.svg" alt="" />
                <input
                  type={canSeePassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm Password"
                />
                <img
                  src="/assets/Vector (5).svg"
                  alt=""
                  onClick={setIfCanSeePassword}
                />
              </div>

              {/* <div className="terms">
                <input type="checkbox" />
                <span>I agree to the Terms & Privacy</span>
              </div> */}

              <div className="sign-buttondiv">
                <button
                  className="sign-button"
                  disabled={isLoading}
                  onClick={(e) => handleSubmit(e)}
                >
                  {isLoading ? (
                    <img src="/assets/spinner.svg" alt="loading..." />
                  ) : (
                    "Sign up"
                  )}
                </button>
              </div>
            </form>
          </div>

          <div className="sign-in-footer">
            <span>Already have an account?</span>
            <Link to="/signin" className="ball">
              Sign In
            </Link>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignupPage;
