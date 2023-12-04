import { useEffect, useState } from "react";
import "./DoctorRegister.css";
import BasicInfoForm from "../../components/BasicInfoForm/BasicInfoForm";
import EducationForm from "../../components/EducationForm/EducationForm";
import WorkForm from "../../components/WorkForm/WorkForm";
import CertificationForm from "../../components/CertificateForm/CertificateForm";
import ProfessionalReferencesForm from "../../components/ProfessionalReferencesForm/ProfessionalReferencesForm";
import OthersForm from "../../components/OthersForm/OthersForm";

const DoctorRegister = () => {
  const [currentTab, setCurrentTab] = useState("basic-info");
  const [currentTabNumber, setCurrentTabNumber] = useState(1);

  const addToTab = () => {
    if (currentTabNumber >= 1 && currentTabNumber < 5) {
      setCurrentTabNumber(currentTabNumber + 1);
    }
    // console.log(currentTabNumber);
  };

  const removeFromTab = () => {
    if (currentTabNumber > 1 && currentTabNumber <= 5) {
      setCurrentTabNumber(currentTabNumber - 1);
    }
    // console.log(currentTabNumber);
  };

  const handleTabChange = (tab) => {
    // console.log("Clicked on tab:", tab);
    setCurrentTab(tab);
  };

  const renderForm = () => {
    switch (currentTabNumber) {
      case 1:
        return <BasicInfoForm />;
      case 2:
        return <EducationForm />;
      // case 3:
      //   return <WorkForm />;
      case 3:
        return <CertificationForm />;
      case 4:
        return <OthersForm />;
      default:
        return null;
    }
  };

  // const currentTabNumber === 1 ? = (tab) => currentTab === tab;
  return (
    <div className="doctor-register">
      <div className="doctor-container">
        <ul className="nav-tabs">
          <li
            className="nav-item"
            onClick={() => setCurrentTabNumber(1)}
            style={
              currentTabNumber === 1
                ? { backgroundColor: "white", width: "120%" }
                : {}
            }
          >
            <a className={`nav-link ${currentTabNumber === 1 ? "active" : ""}`}>
              <img src="/assets/Vector (9).svg" alt="" />
              <span>Basic Info</span>
            </a>
          </li>

          <li
            className="nav-item"
            onClick={() => setCurrentTabNumber(2)}
            style={
              currentTabNumber === 2
                ? { backgroundColor: "white", width: "120%" }
                : {}
            }
          >
            <a className={`nav-link ${currentTabNumber === 2 ? "active" : ""}`}>
              <img src="/assets/GraduationCap.svg" alt="" />
              <span>Education</span>
            </a>
          </li>

          {/* <li
            className="nav-item"
            onClick={() => setCurrentTabNumber(3)}
            style={
              currentTabNumber === 3
                ? { backgroundColor: "white", width: "120%" }
                : {}
            }
          >
            <a className={`nav-link ${currentTabNumber === 3 ? "active" : ""}`}>
              <img src="/assets/Vector (10).svg" alt="" />
              <span>Work Experience</span>
            </a>
          </li> */}

          <li
            className="nav-item"
            onClick={() => setCurrentTabNumber(3)}
            style={
              currentTabNumber === 3
                ? { backgroundColor: "white", width: "120%" }
                : {}
            }
          >
            <a className={`nav-link ${currentTabNumber === 3 ? "active" : ""}`}>
              <img src="/assets/Vector (11).svg" alt="" />
              <span>Certification & License</span>
            </a>
          </li>
          <li
            className="nav-item"
            onClick={() => setCurrentTabNumber(4)}
            style={
              currentTabNumber === 4
                ? { backgroundColor: "white", width: "120%" }
                : {}
            }
          >
            <a
              className={`nav-link ${currentTabNumber === 4 ? "active" : ""}`}
            >
              <img src="/assets/Vector (10).svg" alt="" />
              <span>Professional References</span>
            </a>
          </li>
        </ul>

        <div className="render-form">
          {renderForm()}

          <div
            className="work-button-cont"
            style={
              currentTabNumber === 1
                ? { display: "flex", justifyContent: "flex-end" }
                : {}
            }
          >
            {currentTabNumber !== 1 && (
              <button onClick={removeFromTab}>Back</button>
            )}

            {currentTabNumber !== 5 && <button onClick={addToTab}>Next</button>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorRegister;
