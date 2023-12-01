import { useState } from "react";
import "./DoctorRegister.css";

const BasicInfoForm = () => {
  return (
    <div className="basic-form">
      <div className="photo-form">
        <input type="image" />
        <span>Upload Photo</span>
      </div>

      <form>
        <label>Name</label>
        <div className="name-form">
          <input type="text" name="name" placeholder="First Name" />
          <input type="text" name="name" placeholder="Last Name" />
        </div>

        <label>Gender</label>
        <div className="gender-form">
          <input type="text" name="gender" placeholder="Select" />
          <img src="/assets/CaretDown.svg" alt="" />
        </div>

        <label>Location*</label>
        <div className="location-form">
          <input type="text" name="location" placeholder="Country" />
          <img src="/assets/CaretDown.svg" alt="" />
        </div>

        <div className="location-form">
          <input type="email" name="email" placeholder="State" />
          <img src="/assets/CaretDown.svg" alt="" />
        </div>

        <label>Date of Birth*</label>
        <div className="date-form">
          <div className="dob-form">
            <input type="name" name="date of birth" placeholder="Day" />
            <img src="/assets/CaretDown.svg" alt="" />
          </div>

          <div className="dob-form">
            <input type="name" name="date of birth" placeholder="Month" />
            <img src="/assets/CaretDown.svg" alt="" />
          </div>

          <div className="dob-form">
            <input type="name" name="date of birth" placeholder="Year" />
            <img src="/assets/CaretDown.svg" alt="" />
          </div>
        </div>

        <div className="doctor-reg-btn">
          <button>next</button>
        </div>
      </form>
    </div>
  );
};

const EducationForm = () => {
  return (
    <div className="education-form">
      <form>
        <label>Degree*:</label>
        <input type="text" name="degree" />

        <label>Major*</label>
        <input type="text" name="major" />

        <label>University*</label>
        <input type="text" name="university" />

        <label>Date of Graduation*</label>
        <div className="dategrad-form">
          <div className="grad-form">
            <input type="text" name="date of grad" placeholder="Month" />
            <img src="/assets/CaretDown.svg" alt="" />
          </div>

          <div className="grad-form">
            <input type="text" name="date of grad" placeholder="Year" />
            <img src="/assets/CaretDown.svg" alt="" />
          </div>
        </div>

        <label>Degree Certificate*</label>
        <div className="deg-form">
          <img src="/assets/mingcute_add-line.svg" alt="" />
          <span>Upload File (max file size 10 mb)</span>
        </div>

        <div className="edu-form">
          <img src="assets/Frame 81.svg" alt="" />
          <span>Add education</span>
        </div>

        <div className="doctor-reg-btn">
          <button>next</button>
        </div>
      </form>
    </div>
  );
};

const WorkForm = () => {
  return (
    <div className="work-form">
      <form>
        <label>Job Title*:</label>
        <input type="text" name="job title" />

        <label>Institution*</label>
        <input type="text" name="Institution" />

        <label>Start Date*</label>
        <div className="start-form">
          <div className="startdate-form">
            <input type="text" name="start date" placeholder="month" />
            <img src="/assets/CaretDown.svg" alt="" />
          </div>

          <div className="startdate-form"></div>
          <input type="text" name="start date" placeholder="year" />
          <img src="/assets/CaretDown.svg" alt="" />
        </div>

        <label>End Date*</label>

        <div className="current-form">
          <input type="checkbox" />
          <span>current</span>
        </div>

        <div className="end-form">
          <div className="enddate-form">
            <input type="text" name="start date" placeholder="month" />
            <img src="/assets/CaretDown.svg" alt="" />
          </div>

          <div className="enddate-form">
            <input type="text" name="start date" placeholder="year" />
            <img src="/assets/CaretDown.svg" alt="" />
          </div>
        </div>

        <div className="add-exp">
          <img src="assets/Frame 81.svg" alt="" />
          <span>Add Work Experience</span>
        </div>

        <div className="doctor-reg-btn">
          <button type="submit">next</button>
        </div>
      </form>
    </div>
  );
};

const CertificationForm = () => {
  return (
    <div className="certifcation-form">
      <form>
        <label>Medical License*:</label>
        <input type="text" name="job title" />

        <label>Issue Date*</label>
        <div className="issue">
          <div className="first">
            <input type="date" name="date" placeholder="Month" />
            <img src="assets/Frame 81.svg" alt="" />
          </div>
          <div className="first">
            <input type="date" name="date" placeholder="Year" />
            <img src="assets/Frame 81.svg" alt="" />
          </div>
        </div>

        <label>Certification*</label>
        <input type="text" name="text" />

        <label>Issuing Body*</label>
        <input type="text" name="start date" />

        <div className="hold">
          <input type="checkbox" />
          <span> I don't hold any medical certification</span>
        </div>

        <div className="cert">
          <img src="assets/Frame 81.svg" alt="" />
          <span>Add Certification</span>
        </div>

        <div className="doctor-reg-btn">
          <button type="submit">next</button>
        </div>
      </form>
    </div>
  );
};

// const ProfessionalForm = () => {
//   return (
//     <div className="professional-form">
//       <form>
//         <label>Medical License*:</label>
//         <input type="text" name="job title" />

//         <label>Issue Date*</label>
//         <div className="issue">
//           <div className="first">
//             <input type="date" name="date" placeholder="Month" />
//             <img src="assets/Frame 81.svg" alt="" />
//           </div>
//           <div className="first">
//             <input type="date" name="date" placeholder="Year" />
//             <img src="assets/Frame 81.svg" alt="" />
//           </div>
//         </div>

//         <label>Certification*</label>
//         <input type="text" name="text" />

//         <label>Issuing Body*</label>
//         <input type="text" name="start date" />

//         <div className="hold">
//           <input type="checkbox" />
//           <span> i don't hold any medical certification</span>
//         </div>

//         <div className="cert">
//           <img src="assets/Frame 81.svg" alt="" />
//           <span>Add Certification</span>
//         </div>

//         <div className="doctor-reg-btn">
//           <button type="submit">next</button>
//         </div>
//       </form>
//     </div>
//   );
// };

const DoctorRegister = () => {
  const [currentTab, setCurrentTab] = useState("basic-info");

  const handleTabChange = (tab) => {
    console.log("Clicked on tab:", tab);
    setCurrentTab(tab);
  };

  const renderForm = () => {
    switch (currentTab) {
      case "basic-info":
        return <BasicInfoForm />;
      case "profile":
        return <EducationForm />;
      case "work":
        return <WorkForm />;
      case "cert":
        return <CertificationForm />;
      default:
        return null;
    }
  };

  const isTabActive = (tab) => currentTab === tab;

  return (
    <div className="doctor-register">
      <div className="doctor-container">
        <ul className="nav-tabs">
          <li className="nav-item" style={isTabActive("basic-info") ? { backgroundColor: "white", width : "120%" } : {}}>
            <a className={`nav-link ${isTabActive("basic-info") ? "active" : ""}`} onClick={() => handleTabChange("basic-info")}>
              <img src="/assets/Vector (9).svg" alt="" />
              <span>Basic Info</span>
            </a>
          </li>

          <li className="nav-item" style={isTabActive("profile") ? { backgroundColor: "white" } : {}}>
            <a className={`nav-link ${isTabActive("profile") ? "active" : ""}`} onClick={() => handleTabChange("profile")}>
              <img src="/assets/GraduationCap.svg" alt="" />
              <span>Education</span>
            </a>
          </li>

          <li className="nav-item" style={isTabActive("work") ? { backgroundColor: "white" } : {}}>
            <a className={`nav-link ${isTabActive("work") ? "active" : ""}`} onClick={() => handleTabChange("work")}>
              <img src="/assets/Vector (10).svg" alt="" />
              <span>Work Experience</span>
            </a>
          </li>

          <li className="nav-item" style={isTabActive("cert") ? { backgroundColor: "white" } : {}}>
            <a className={`nav-link ${isTabActive("cert") ? "active" : ""}`} onClick={() => handleTabChange("cert")}>
              <img src="/assets/Vector (11).svg" alt="" />
              <span>Certification & License</span>
            </a>
          </li>
        </ul>

        <div className="render-form">{renderForm()}</div>
      </div>
    </div>
  );
};

export default DoctorRegister;



// manner

// manner

// manner
