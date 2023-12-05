import "./basicInfoForm.css";
// import Select from "react-select";

import { useEffect, useState } from "react";
import {
  setFirstName,
  setPassword,
  setGender,
  setLocation,
  setLastName,
  setEmail,
  setDateOfBirth,
} from "../../redux/doctors/FormSlice";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";

const BasicInfoForm = () => {
  const firstName = useSelector((state) => state.formSlice.firstName);
  const lastName = useSelector((state) => state.formSlice.lastName);
  const email = useSelector((state) => state.formSlice.email);
  const password = useSelector((state) => state.formSlice.password);
  const gender = useSelector((state) => state.formSlice.gender);
  const location = useSelector((state) => state.formSlice.location);
  const dateOfBirth = useSelector((state) => state.formSlice.dateOfBirth);

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

  function getFormattedDateOfBirth(day, month, year) {
    // Ensure the input values are valid numbers
    const parsedDay = parseInt(day, 10);
    const parsedMonth = parseInt(month, 10);
    const parsedYear = parseInt(year, 10);

    // Check if the parsed values are valid numbers and within reasonable ranges
    if (
      isNaN(parsedDay) ||
      isNaN(parsedMonth) ||
      isNaN(parsedYear) ||
      parsedDay < 1 ||
      parsedDay > 31 ||
      parsedMonth < 1 ||
      parsedMonth > 12 ||
      parsedYear < 1900 ||
      parsedYear > new Date().getFullYear()
    ) {
      // Return an error message or handle invalid input as needed
      return "Invalid date of birth";
    }

    // Create a Date object using the provided values
    const dob = new Date(parsedYear, parsedMonth - 1, parsedDay);

    // Format the date as "YYYY-MM-DD"
    const formattedDate = dob.toISOString().split("T")[0];

    return formattedDate;
  }

  // Example usage:
  // const formattedDateOfBirth = getFormattedDateOfBirth("15", "6", "1990");
  // console.log(formattedDateOfBirth); // Output: "1990-06-15"

  // const []
  // const customStyles = {
  //   control: (provided) => ({
  //     ...provided,
  //     borderRadius: "20px",
  //     borderColor: "#D3D3D3",
  //     padding: "0.4em 1em",
  //     // fontSize: "0.9em", // Font size for the container
  //     width: "100%",
  //     // maxWidth: '1000px',
  //     // margin: '0 auto',
  //     color: "#D3D3D3", // Text color for the container
  //     fontSize: "0.9em",
  //     fontWeight: "400",
  //   }),
  //   indicatorSeparator: () => ({
  //     display: "none",
  //   }),
  //   dropdownIndicator: (provided) => ({
  //     ...provided,
  //     color: "#D3D3D3",
  //   }),
  //   menu: (provided) => ({
  //     color: "#d3d3d3",
  //     ...provided,
  //     fontSize: "0.9em", // Font size for the dropdown menu
  //   }),
  //   option: (provided) => ({
  //     ...provided,
  //     fontSize: "0.9em", // Font size for individual options in the dropdown
  //     color: "black",
  //   }),
  //   placeholder: (provided) => ({
  //     ...provided,
  //     fontSize: "1em", // Font size for the placeholder
  //     color: "#D3D3D3",
  //   }),
  // };
  // const options = [
  //   { value: "option1", label: "Option 1" },
  //   { value: "option2", label: "Option 2" },
  //   { value: "option3", label: "Option 3" },
  // ];

  const [selectedDay, setSelectedDay] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  useEffect(() => {
    var dob;
    if (selectedDay !== "" && selectedMonth !== "" && selectedYear !== "") {
      dob = getFormattedDateOfBirth(selectedDay, selectedMonth, selectedYear);
    }

    // Update the formData state
    setFormData((prevFormData) => ({
      ...prevFormData,
      dateOfBirth: dob,
    }));

    console.log(formData);
  }, [selectedDay, selectedMonth, selectedYear]);

  const handleDayChange = (e) => {
    setSelectedDay(e.target.value);
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setEmail(formData.email));
  }, [formData.email]);

  useEffect(() => {
    dispatch(setFirstName(formData.firstName));
  }, [formData.firstName]);

  useEffect(() => {
    if (formData.lastName !== "") {
      dispatch(setLastName(formData.lastName));
    }
  }, [formData.lastName]);

  useEffect(() => {
    if (formData.password !== "") {
      dispatch(setPassword(formData.password));
    }
  }, [formData.password]);

  useEffect(() => {
    if (formData.gender !== "") {
      dispatch(setGender(formData.gender));
    }
  }, [formData.gender]);
  useEffect(() => {
      dispatch(setDateOfBirth(selectedDate?.getTime()));
    
  }, [selectedDate]);
  // useEffect(() => {
  //   if (formData.location !== "") {
  //     dispatch(setLocation(formData.location));
  //   }
  // }, [formData.location]);

  const generateOptions = (start, end) => {
    const options = [];
    for (let i = start; i <= end; i++) {
      options.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return options;
  };

  const handleGenderChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      gender: e.target.value,
    }));
  };
  const days = generateOptions(1, 31);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ].map((month, index) => (
    <option key={index} value={index + 1}>
      {month}
    </option>
  ));
  // const years = generateOptions(1960, 2005);

  return (
    <div className="basic-form">
      <div className="photo-form">
        <img type="image" src="/assets/avatar-fake.png" />
        <input type="file" className="basic-form_file" />
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
