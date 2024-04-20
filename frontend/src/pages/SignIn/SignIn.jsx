import "./SignIn.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../../redux/user/UserSlice";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignIn = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.userSlice.user);

  const isError = useSelector((state) => state.userSlice.isError);
  const error = useSelector((state) => state.userSlice.error);

  const [canSeePassword, setCanSeePassword] = useState(false);
  if (user) {
    console.log(user);
    navigate("/");
  }

  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const isLoading = useSelector((state) => state.userSlice.loading);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(loginUser(formData));
  };

  useEffect(() => {
    if (user !== null) {
      navigate("/");
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

  const setIfCanSeePassword = () => {
    setCanSeePassword(!canSeePassword);
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
              <input
                type={canSeePassword ? "text" : "password"}
                name="password"
                onChange={handleChange}
              />
              <img
                src="/assets/Vector (5).svg"
                alt=""
                onClick={setIfCanSeePassword}
                style={{ cursor: "pointer" }}
              />
            </div>

            {/* <div className="terms">
              <input type="checkbox" />
              <span>I agree to the Terms & Privacy</span>
            </div> */}

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

        <div className="sign-in-footer">
          <span>
            Don't have an account?{" "}
            <a href="/signup" className="ball">
              Sign Up
            </a>
          </span>
          <a href="#">Forgot Password</a>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignIn;
