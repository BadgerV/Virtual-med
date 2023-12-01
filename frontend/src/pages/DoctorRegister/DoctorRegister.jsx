import React from 'react';
import './DoctorRegister.css';

import React, { useState } from "react";

const BasicInfoForm = () => {
  return (
    <form>
      <label>Name*</label>
      <input type="text" name="name" placeholder="First Name" />
      <input type="text" name="name" placeholder="Last Name" />

      <label>Gender*</label>
      <div className="first">
        <input type="text" name="gender" placeholder="Select" />
        <img src="/assets/CaretDown.svg" alt="" />
      </div>

      <label>Location*</label>

      <div className="first">
        <input type="text" name="location" placeholder="Country" />
        <img src="/assets/CaretDown.svg" alt="" />
      </div>

      <div className="first">
        <input type="email" name="email" placeholder="State" />
        <img src="/assets/CaretDown.svg" alt="" />
      </div>

      <label>Date of Birth*</label>
      <div className="first">
        <input type="name" name="date of birth" placeholder="Day" />
        <img src="/assets/CaretDown.svg" alt="" />
      </div>

      <div className="first">
        <input type="name" name="date of birth" placeholder="Month" />
        <img src="/assets/CaretDown.svg" alt="" />
      </div>

      <div className="first">
        <input type="name" name="date of birth" placeholder="Year" />
        <img src="/assets/CaretDown.svg" alt="" />
      </div>

      <button type="submit">Sign Up</button>
    </form>
  );
};

const EducationForm = () => {
  return (
    <form>
      <label>Degree*:</label>
      <input type="text" name="specialty" placeholder="Enter your specialty" />

      <label>Major*</label>
      <input
        type="text"
        name="licenseNumber"
        placeholder="Enter your license number"
      />

      <label>University*</label>
      <input
        type="text"
        name="licenseNumber"
        placeholder="Enter your license number"
      />

      <label>Date of Gradution*</label>
      <div className="edu">
        <input type="text" name="lDate of Gradution" placeholder="Month" />
        <img src="/assets/CaretDown.svg" alt="" />
      </div>

      <label>Major*</label>
      <div className="edu">
        <input type="text" name="Date of Graduation" placeholder="Year" />
        <img src="/assets/CaretDown.svg" alt="" />
      </div>

      <label>Degree Certificate*</label>
      <div className="edu">
        <img src="/assets/mingcute_add-line.svg" alt="" />
        <span>Upload File (max file size 10 mb)</span>
      </div>

      <div className="edu">
        <span>Add education</span>
        <img src="assets/Frame 81.svg" alt="" />
      </div>

      <button type="submit">Sign Up</button>
    </form>
  );
};

const WorkForm = () => {
  return (
    <form>
      <label>Job Title*:</label>
      <input type="text" name="job title" />

      <label>Institution*</label>
      <input type="text" name="Institution" />

      <label>Start Date*</label>
      <input type="text" name="start date" placeholder="month" />

      <input type="text" name="start date" placeholder="year" />

      <div className="alll">
        <input type="checkbox" />
        <span>current</span>
      </div>

      <label>End Date*</label>
      <input type="text" name="start date" placeholder="month" />

      <input type="text" name="start date" placeholder="year" />


      <div className="edu">
        <span>Add Work Experience</span>
        <img src="assets/Frame 81.svg" alt="" />
      </div>


      <button type="submit">Sign Up</button>
    </form>
  );
};



const CertificationForm = () => {
  return (
    <form>
      <label>Medical License*:</label>
      <input type="text" name="job title" />

      <label>Issue Date*</label>
      <input type="text" name="Institution" />

      <label>Start Date*</label>
      <input type="text" name="start date" placeholder="month" />

      <input type="text" name="start date" placeholder="year" />

      <div className="alll">
        <input type="checkbox" />
        <span>current</span>
      </div>

      <label>End Date*</label>
      <input type="text" name="start date" placeholder="month" />

      <input type="text" name="start date" placeholder="year" />


      <div className="edu">
        <span>Add Work Experience</span>
        <img src="assets/Frame 81.svg" alt="" />
      </div>


      <button type="submit">Sign Up</button>
    </form>
  );
};














const DoctorRegister = () => {
  const [currentTab, setCurrentTab] = useState("basic-info");

  const handleTabChange = (tab) => {
    setCurrentTab(tab);
  };

  const renderForm = () => {
    switch (currentTab) {
      case "basic-info":
        return <BasicInfoForm />;
      case "profile":
        return <EducationForm />;
        case "work":
            return<WorkForm />;
      default:
        return null;
    }
  };

  return (
    <div className="profile-signup">
      <h2>Create Your Doctor Profile</h2>

      <ul className="nav nav-tabs">
        <li className="nav-item">
          <a
            className={`nav-link ${
              currentTab === "basic-info" ? "active" : ""
            }`}
            onClick={() => handleTabChange("basic-info")}
          >
            <h1>Basic Info</h1>
            <img src="/assets/Vector (9).svg" alt="" />
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ${currentTab === "profile" ? "active" : ""}`}
            onClick={() => handleTabChange("profile")}
          >
            <h1>Education</h1>
            <img src="/assets/GraduationCap.svg" alt="" />
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ${
              currentTab === "basic-info" ? "active" : ""
            }`}
            onClick={() => handleTabChange("basic-info")}
          >
            <h1>Work Experience</h1>
            <img src="/assets/Briefcase.svg" alt="" />
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ${
              currentTab === "basic-info" ? "active" : ""
            }`}
            onClick={() => handleTabChange("basic-info")}
          >
            <h1>Basic Info</h1>
            <img src="/assets/Vector (9).svg" alt="" />
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ${
              currentTab === "basic-info" ? "active" : ""
            }`}
            onClick={() => handleTabChange("basic-info")}
          >
            <h1>Basic Info</h1>
            <img src="/assets/Vector (9).svg" alt="" />
          </a>
        </li>
      </ul>

      {renderForm()}
    </div>
  );
};

export default DoctorRegister;
