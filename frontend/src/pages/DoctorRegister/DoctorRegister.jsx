import { useState } from "react";
import "./DoctorRegister.css";
import BasicInfoForm from "../../components/BasicInfoForm/BasicInfoForm";
import EducationForm from "../../components/EducationForm/EducationForm";
import WorkForm from "../../components/WorkForm/WorkForm";
import CertificationForm from "../../components/CertificateForm/CertificateForm";
import ProfessionalReferencesForm from "../../components/ProfessionalReferencesForm/ProfessionalReferencesForm";

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
      case "prof":
        return <ProfessionalReferencesForm />;
      default:
        return null;
    }
  };

  const isTabActive = (tab) => currentTab === tab;

  return (
    <div className="doctor-register">
      <div className="doctor-container">
        <ul className="nav-tabs">
          <li
            className="nav-item"
            style={
              isTabActive("basic-info")
                ? { backgroundColor: "white", width: "120%" }
                : {}
            }
          >
            <a
              className={`nav-link ${
                isTabActive("basic-info") ? "active" : ""
              }`}
              onClick={() => handleTabChange("basic-info")}
            >
              <img src="/assets/Vector (9).svg" alt="" />
              <span>Basic Info</span>
            </a>
          </li>

          <li
            className="nav-item"
            style={
              isTabActive("profile")
                ? { backgroundColor: "white", width: "120%" }
                : {}
            }
          >
            <a
              className={`nav-link ${isTabActive("profile") ? "active" : ""}`}
              onClick={() => handleTabChange("profile")}
            >
              <img src="/assets/GraduationCap.svg" alt="" />
              <span>Education</span>
            </a>
          </li>

          <li
            className="nav-item"
            style={
              isTabActive("work")
                ? { backgroundColor: "white", width: "120%" }
                : {}
            }
          >
            <a
              className={`nav-link ${isTabActive("work") ? "active" : ""}`}
              onClick={() => handleTabChange("work")}
            >
              <img src="/assets/Vector (10).svg" alt="" />
              <span>Work Experience</span>
            </a>
          </li>

          <li
            className="nav-item"
            style={
              isTabActive("cert")
                ? { backgroundColor: "white", width: "120%" }
                : {}
            }
          >
            <a
              className={`nav-link ${isTabActive("cert") ? "active" : ""}`}
              onClick={() => handleTabChange("cert")}
            >
              <img src="/assets/Vector (11).svg" alt="" />
              <span>Certification & License</span>
            </a>
          </li>
          <li
            className="nav-item"
            style={
              isTabActive("prof")
                ? { backgroundColor: "white", width: "120%" }
                : {}
            }
          >
            <a
              className={`nav-link ${isTabActive("prof") ? "active" : ""}`}
              onClick={() => handleTabChange("prof")}
            >
              <img src="/assets/Vector (10).svg" alt="" />
              <span>Professional Refernces</span>
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
