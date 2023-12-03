import "./educationForm.css";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import axios from "axios";
// import { Cloudinary } from "@cloudinary/url-gen";

import {
  setMajor as setmajor,
  setDegree as setdegree,
  setUniversity as setuniversity,
  setGraduationDate,
  setDegreeCertificate,
} from "../../redux/doctors/FormSlice";
import { useDispatch } from "react-redux";

const EducationForm = () => {
  const dispatch = useDispatch();

  const [selectedDate, setSelectedDate] = useState(null);
  const [major, setMajor] = useState("");
  const [university, setUniversity] = useState("");
  const [degree, setDegree] = useState("");

  //SEND IMAGE TO CLOUDINARY
  // const cloudinary = new Cloudinary({
  //   cloudName: "dfn3xhl0a",
  //   apiKey: "635418789932111",
  //   uploadPreset: "YOUR_CLOUDINARY_UPLOAD_PRESET",
  // });

  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setSelectedFileName(event.target.files[0].name);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("upload_preset", "zf4edni8");

    axios
      .post("https://api.cloudinary.com/v1_1/dfn3xhl0a/upload", formData)
      .then((response) => {
        console.log(response.data["secure_url"]);
        setImageUrl(response.data["secure_url"]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    dispatch(setDegreeCertificate(imageUrl));
  }, [imageUrl]);

  useEffect(() => {
    dispatch(setGraduationDate(selectedDate));
  }, [selectedDate]);

  useEffect(() => {
    dispatch(setdegree(degree));
  }, [degree]);

  useEffect(() => {
    dispatch(setmajor(major));
  }, [major]);

  useEffect(() => {
    dispatch(setuniversity(university));
  }, [university]);

  return (
    <div className="educational-form">
      <div className="education-label_and_input">
        <label>Degree *</label>
        <input type="text" onChange={(e) => setDegree(e.target.value)} />
      </div>

      <div className="education-label_and_input">
        <label>Major *</label>
        <input type="text" onChange={(e) => setMajor(e.target.value)} />
      </div>

      <div className="education-label_and_input">
        <label>University *</label>
        <input type="text" onChange={(e) => setUniversity(e.target.value)} />
      </div>

      <div className="education-duo-inputs-container">
        <label>Date of graduation *</label>
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
          placeholderText="Select a date"
          // style={customStyles}
        />
      </div>

      <div className="upload-image-div">
        <label htmlFor="">Degree Certificate *</label>
        <div className="input-file-container">
          <input
            type="file"
            onChange={(e) => {
              handleFileChange(e), handleUpload();
            }}
          />
          <img src="/assets/cloud-icon.svg" alt="" />
          <div className="input-chaarde">
            {selectedFile
              ? selectedFileName
              : "Upload File (max file size 10mb)"}
          </div>
        </div>
      </div>

      {/* <div className="education-button-cont">
        <button>back</button>
        <button>next</button>
      </div> */}
    </div>
  );
};

export default EducationForm;
