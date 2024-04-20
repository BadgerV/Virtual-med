import "./basicInfoForm.css";
// import Select from "react-select";
import axios from "axios";

import { useEffect, useState } from "react";
import {
  setFirstName,
  setPassword,
  setGender,
  setLastName,
  setEmail,
  setDateOfBirth,
  setPassportImage,
} from "../../redux/doctors/FormSlice";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";

const BasicInfoForm = () => {
  const firstName =
    localStorage.getItem("firstName") !== null
      ? localStorage.getItem("firstName")
      : "";
  const lastName =
    localStorage.getItem("lastName") !== null
      ? localStorage.getItem("lastName")
      : "";
  const email =
    localStorage.getItem("email") !== null ? localStorage.getItem("email") : "";
  const password =
    localStorage.getItem("password") !== null
      ? localStorage.getItem("password")
      : "";
  const gender =
    localStorage.getItem("gender") !== null
      ? localStorage.getItem("gender")
      : "";
  const location = localStorage.getItem("location");
  const dateOfBirth = localStorage.getItem("dateOfBirth");

  const [formData, setFormData] = useState({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
    yearsOfExperience: "",
    phoneNumber: "",
    medicalLisense: "",
    boardCertification: "",
    speciality: "",
    passportImage: "",
    location: location,
    hourlyPrice: "",
    dateOfBirth: dateOfBirth,
    gender: gender,
  });

  const [locationCountry, setLocationCountry] = useState("");
  const [locationState, setLoadtionState] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    if (locationCountry !== "" && locationState !== "") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        location: `${locationState}, ${locationCountry}`,
      }));
    }
  }, [locationCountry, locationState]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // function getFormattedDateOfBirth(day, month, year) {
  //   // Ensure the input values are valid numbers
  //   const parsedDay = parseInt(day, 10);
  //   const parsedMonth = parseInt(month, 10);
  //   const parsedYear = parseInt(year, 10);

  //   // Check if the parsed values are valid numbers and within reasonable ranges
  //   if (
  //     isNaN(parsedDay) ||
  //     isNaN(parsedMonth) ||
  //     isNaN(parsedYear) ||
  //     parsedDay < 1 ||
  //     parsedDay > 31 ||
  //     parsedMonth < 1 ||
  //     parsedMonth > 12 ||
  //     parsedYear < 1900 ||
  //     parsedYear > new Date().getFullYear()
  //   ) {
  //     // Return an error message or handle invalid input as needed
  //     return "Invalid date of birth";
  //   }

  //   // Create a Date object using the provided values
  //   const dob = new Date(parsedYear, parsedMonth - 1, parsedDay);

  //   // Format the date as "YYYY-MM-DD"
  //   const formattedDate = dob.toISOString().split("T")[0];

  //   return formattedDate;
  // }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem("email", formData.email);

    dispatch(setEmail(formData.email));
  }, [formData.email]);

  useEffect(() => {
    dispatch(setFirstName(formData.firstName));
    localStorage.setItem("firstName", formData.firstName);
  }, [formData.firstName]);

  useEffect(() => {
    if (formData.lastName !== "") {
      localStorage.setItem("lastName", formData.lastName);

      dispatch(setLastName(formData.lastName));
    }
  }, [formData.lastName]);

  useEffect(() => {
      localStorage.setItem("password", formData.password);
      dispatch(setPassword(formData.password));
  }, [formData.password]);

  useEffect(() => {
    if (formData.gender !== "") {
      dispatch(setGender(formData.gender));
    }
  }, [formData.gender]);
  useEffect(() => {
    localStorage.setItem("dateOfBirth", selectedDate?.getTime());

    dispatch(setDateOfBirth(selectedDate?.getTime()));
  }, [selectedDate]);
  // useEffect(() => {
  //   if (formData.location !== "") {
  //     dispatch(setLocation(formData.location));
  //   }
  // }, [formData.location]);

  // const generateOptions = (start, end) => {
  //   const options = [];
  //   for (let i = start; i <= end; i++) {
  //     options.push(
  //       <option key={i} value={i}>
  //         {i}
  //       </option>
  //     );
  //   }
  //   return options;
  // };

  const handleProofUpload = (file, setLinkState) => {
    const formData = new FormData();
    formData.append("file", passport);
    formData.append("upload_preset", "zf4edni8"); // Replace with your Cloudinary upload preset

    axios
      .post("https://api.cloudinary.com/v1_1/dfn3xhl0a/upload", formData)
      .then((response) => {
        console.log(response.data["secure_url"]);
        setLinkState(response.data["secure_url"]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const [passport, setPassport] = useState(null);
  const [passportLink, setPassportLink] = useState(
    localStorage.getItem("passportLink")
      ? localStorage.getItem("passportLink")
      : ""
  );

  useEffect(() => {
    if (passport !== null) {
      handleProofUpload(passport, setPassportLink);
    }
  }, [passport]);

  useEffect(() => {
    if (passportLink !== "") {
      localStorage.setItem("passportLink", passportLink);

      dispatch(setPassportImage(passportLink));
    }
  }, [passportLink]);

  return (
    <div className="basic-form">
      <div className="photo-form">
        <img
          type="image"
          src={
            passportLink
              ? passportLink
              : passport
              ? URL.createObjectURL(passport)
              : "/assets/avatar-fake.png"
          }
          style={{ maxHeight: "8em", maxWidth: "8em" }}
        />
        <input
          type="file"
          className="basic-form_file"
          onChange={(e) => {
            setPassport(e.target.files[0]);
          }}
        />
        <span>Upload Photo</span>
      </div>

      <form className="basic-form-info">
        <div className="name-form">
          <div className="name-form_div">
            <label>Name*</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              placeholder="First name"
              onChange={handleChange}
            />
          </div>

          <div className="name-form_div">
            <label>‎ </label>
            <input
              type="text"
              value={formData.lastName}
              name="lastName"
              placeholder="Last name"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="name-form_div">
          <label>Email *</label>
          <input
            type="email"
            value={formData.email}
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />
        </div>

        <div className="name-form_div">
          <label>Password *</label>
          <input
            value={formData.password}
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />
        </div>

        {/* <div className="gender-form">
          <label>Gender *</label>
          <div className="gender-form">
            <select
              className="custom-dropdown"
              onChange={(e) => handleGenderChange(e)}
            >
              <option value="">Choose an option</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>

            <img src="/assets/CaretDown.svg" alt="" className="dropdown-icon" />
          </div>
        </div> */}

        {/* <div className="location-form">
          <label>Location*</label>
          <div className="location-mini_div">
            <div className="location-mini_left">
              <select
                className="custom-dropdown"
                onChange={(e) => setLocationCountry(e.target.value)}
              >
                <option value="">Country</option>
                <option value="Nigeria">Nigeria</option>
              </select>

              <img
                src="/assets/CaretDown.svg"
                alt=""
                className="dropdown-icon"
              />
            </div>

            <div className="location-mini_right">
              <select
                className="custom-dropdown"
                onChange={(e) => setLoadtionState(e.target.value)}
              >
                <option value="" disabled defaultValue>
                  State
                </option>
                <option value="Osun">Osun state</option>
                <option value="Lagos">Lagos state</option>
              </select>

              <img
                src="/assets/CaretDown.svg"
                alt=""
                className="dropdown-icon"
              />
            </div>
          </div>
        </div> */}

        <div className="date-of-birth-form">
          <div className="education-duo-inputs-container">
            <label>Date of birth *</label>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="yyyy-MM-dd"
              showYearDropdown
              scrollableYearDropdown
              yearDropdownItemNumber={40} // Number of years shown in the dropdown
              yearDropdownMin={1980} // Minimum year in the dropdown
              yearDropdownMax={2020} // Maximum year in the dropdown
              className="custom-date-input"
              id="dob"
              name="dob"
              placeholderText="Date of birth"
              // style={customStyles}
            />
          </div>
        </div>

        {/* <div className="buttons-container">
          <button className="button doctor-register_back-button">back</button>
          <button className="button doctor-register_next-button">next</button>
        </div> */}
      </form>
    </div>
  );
};

export default BasicInfoForm;
