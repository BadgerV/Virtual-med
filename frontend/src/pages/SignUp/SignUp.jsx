import { useState } from "react";
import "./SignUp.css";
import { Link } from "react-router-dom";
import { registerUser } from "../../redux/user/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
  });
  //EVERYTHIING RELATING TO STATE
  const dispatch = useDispatch();
  // const user = useSelector((state) => state.userSlice.user);
  const isLoading = useSelector((state) => state.userSlice.loading);

  //SELF EXPLANATORY
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await dispatch(registerUser(formData));

    if (response.payload._id) {
      navigate("/");
    } 
    else {
      //TAKE CARE OF THE IF NOT
    }
  };

  ////SELF EXPLANATORY
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <div className="newsign">
      <h1>Sign Up</h1>

      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          type="text"
          placeholder="First Name"
          id="firstName"
          className="signs"
        />
        <input
          onChange={handleChange}
          type="text"
          placeholder="Last Name"
          id="lastName"
          className="signs"
        />
        <input
          onChange={handleChange}
          type="email"
          placeholder="Email"
          id="email"
          className="signs"
        />
        <input
          onChange={handleChange}
          type="text"
          placeholder="Phone Number"
          id="phoneNumber"
          className="signs"
        />
        <input
          onChange={handleChange}
          type="password"
          placeholder="Password"
          id="password"
          className="sings"
        />
        <button type="submit" disabled={isLoading}>
          Sign Up
        </button>
      </form>

      <div className="down">
        <p>Already have an account?</p>
        <Link to="/signin">
          <h2 className="enter">Sign In</h2>
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
