import { useState, useEffect } from "react";
import "./DoctorRegister.css";
import BasicInfoForm from "../../components/BasicInfoForm/BasicInfoForm";
import EducationForm from "../../components/EducationForm/EducationForm";
// import WorkForm from "../../components/WorkForm/WorkForm";
import CertificationForm from "../../components/CertificateForm/CertificateForm";
// import ProfessionalReferencesForm from "../../components/ProfessionalReferencesForm/ProfessionalReferencesForm";
import OthersForm from "../../components/OthersForm/OthersForm";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { registerStaff } from "../../redux/doctors/FormSlice";
import AbouttMe from "../../components/AboutMe/AbouttMe";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DoctorRegister = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isError = useSelector((state) => state.userSlice.isError);
  const error = useSelector((state) => state.userSlice.error);

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

  const [currentTab, setCurrentTab] = useState("basic-info");
  const [currentTabNumber, setCurrentTabNumber] = useState(1);

  const [localIsLoading, setLocalIsLoading] = useState(false);
  const [isNullOrEmpty, setIsNullOrEmpty] = useState(false);

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

  // Retrieve data from Redux state
  const {
    firstName,
    lastName,
    email,
    password,
    yearsOfExperience,
    phoneNumber,
    medicalLisense,
    proofOfIdentity,
    speciality,
    hourlyPrice,
    passportImage,
    dateOfBirth,
    location,
    boardCertification,
    gender,
    major,
    degree,
    university,
    graduationDate,
    degreeCertificate,
    POMI,
    CV,
    aboutMe,
  } = useSelector((state) => state.formSlice);

  const staff = useSelector((state) => state.formSlice.staff);
  // const user = useSelector((state) => state.userSlice.user);

  // useEffect(() => {
  //   if (staff !== null || user !== null) {
  //     navigate("/get-available-dates");
  //   }
  // }, [staff, user]);

  useEffect(() => {
    if (staff !== null) {
      const keyToKeep = "token";

      // Iterate through localStorage keys
      Object.keys(localStorage).forEach((key) => {
        // Check if the key is not the one you want to keep
        if (key !== keyToKeep) {
          // Remove the item
          localStorage.removeItem(key);
        }
      });
      navigate("/get-available-dates");
    }
  }, [staff]);

  // Local state to track changes
  const [localFirstName, setLocalFirstName] = useState(firstName);
  const [localLastName, setLocalLastName] = useState(lastName);
  const [localEmail, setLocalEmail] = useState(email);
  const [localPassword, setLocalPassword] = useState(password);
  const [localYearsOfExperience, setLocalYearsOfExperience] =
    useState(yearsOfExperience);
  const [localPhoneNumber, setLocalPhoneNumber] = useState(phoneNumber);
  const [localMedicalLisense, setLocalMedicalLisense] =
    useState(medicalLisense);
  const [localProofOfIdentity, setLocalProofOfIdentity] =
    useState(proofOfIdentity);
  const [localSpeciality, setLocalSpeciality] = useState(speciality);
  const [localHourlyPrice, setLocalHourlyPrice] = useState(hourlyPrice);
  const [localPassportImage, setLocalPassportImage] = useState(passportImage);
  const [localDateOfBirth, setLocalDateOfBirth] = useState(dateOfBirth);
  const [localLocation, setLocalLocation] = useState(location);
  const [localBoardCertification, setLocalBoardCertification] =
    useState(boardCertification);
  const [localGender, setLocalGender] = useState(gender);
  const [localMajor, setLocalMajor] = useState(major);
  const [localDegree, setLocalDegree] = useState(degree);
  const [localUniversity, setLocalUniversity] = useState(university);
  const [localGraduationDate, setLocalGraduationDate] =
    useState(graduationDate);
  const [localDegreeCertificate, setLocalDegreeCertificate] =
    useState(degreeCertificate);
  const [localPOMI, setLocalPOMI] = useState(POMI);
  const [localCV, setLocalCV] = useState(CV);
  const [localAboutMe, setLocalAboutMe] = useState(aboutMe);

  // useEffects to update local state when Redux state changes
  useEffect(() => {
    setLocalFirstName(firstName);
  }, [firstName]);

  useEffect(() => {
    setLocalLastName(lastName);
  }, [lastName]);

  useEffect(() => {
    setLocalEmail(email);
  }, [email]);

  useEffect(() => {
    setLocalPassword(password);
  }, [password]);

  useEffect(() => {
    setLocalYearsOfExperience(yearsOfExperience);
  }, [yearsOfExperience]);

  useEffect(() => {
    setLocalPhoneNumber(phoneNumber);
  }, [phoneNumber]);

  useEffect(() => {
    setLocalMedicalLisense(medicalLisense);
  }, [medicalLisense]);

  useEffect(() => {
    setLocalProofOfIdentity(proofOfIdentity);
  }, [proofOfIdentity]);

  useEffect(() => {
    setLocalSpeciality(speciality);
  }, [speciality]);

  useEffect(() => {
    setLocalHourlyPrice(hourlyPrice);
  }, [hourlyPrice]);

  useEffect(() => {
    setLocalPassportImage(passportImage);
  }, [passportImage]);

  useEffect(() => {
    setLocalDateOfBirth(dateOfBirth);
  }, [dateOfBirth]);

  useEffect(() => {
    setLocalLocation(location);
  }, [location]);

  useEffect(() => {
    setLocalBoardCertification(boardCertification);
  }, [boardCertification]);

  useEffect(() => {
    setLocalGender(gender);
  }, [gender]);

  useEffect(() => {
    setLocalMajor(major);
  }, [major]);

  useEffect(() => {
    setLocalDegree(degree);
  }, [degree]);

  useEffect(() => {
    setLocalUniversity(university);
  }, [university]);

  useEffect(() => {
    setLocalGraduationDate(graduationDate);
  }, [graduationDate]);

  useEffect(() => {
    setLocalDegreeCertificate(degreeCertificate);
  }, [degreeCertificate]);

  useEffect(() => {
    setLocalPOMI(POMI);
  }, [POMI]);

  useEffect(() => {
    setLocalCV(CV);
  }, [CV]);

  useEffect(() => {
    setLocalAboutMe(aboutMe);
  }, [aboutMe]);

  const checkFields = (e, callback) => {
    e.preventDefault();

    // Define an array of fields to check
    const fieldsToCheck = [
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      // medicalLisense,
      // proofOfIdentity,
      speciality,
      hourlyPrice,
      passportImage,
      // dateOfBirth,
      location,
      // boardCertification,
      major,
      degree,
      university,
      // graduationDate,
      // degreeCertificate,
      // CV,
      aboutMe,
    ];

    // Check if any field is null or empty after trimming
    const isAnyFieldNullOrEmpty = fieldsToCheck.some(
      (field) => !field || field.trim() === ""
    );

    if (isAnyFieldNullOrEmpty) {
      setIsNullOrEmpty(true); // Assuming setIsNullOrEmpty is defined and works as expected
    } else {
      callback(e);
    }
  };


  const handleSubmit = async (e) => {
    console.log("working");
    e.preventDefault();
    await dispatch(
      registerStaff({
        firstName: localStorage.getItem("firstName"),
        lastName: localStorage.getItem("lastName"),
        email: localStorage.getItem("email"),
        password: localStorage.getItem("password"),
        yearsOfExperience: localStorage.getItem("yearsOfExperience"),
        phoneNumber: localStorage.getItem("phoneNumber"),
        medicalLisense: localStorage.getItem("medicalLisenseLink"),
        proofOfIdentity: localStorage.getItem("proofLink"),
        speciality: localStorage.getItem("speciality"),
        hourlyPrice: localStorage.getItem("hourlyPrice"),
        passportImage: localStorage.getItem("passportLink"),
        dateOfBirth: new Date(localDateOfBirth),
        location: localStorage.getItem("location"),
        boardCertification: localStorage.getItem("firstName"),
        gender: localGender,
        major: localStorage.getItem("major"),
        degree: localStorage.getItem("degree"),
        university: localStorage.getItem("university"),
        graduationDate: new Date(localGraduationDate),
        degreeCertificate: localStorage.getItem("degreeUrl"),
        POMI: localStorage.getItem("POMILink"),
        CV: localStorage.getItem("CVLink"),
        aboutMe: localStorage.getItem("aboutMe"),
      })
    );
  };

  const renderForm = () => {
    switch (currentTabNumber) {
      case 1:
        return <BasicInfoForm />;
      case 2:
        return <EducationForm setLocalIsLoading={setLocalIsLoading} />;
      // case 3:
      //   return <WorkForm />;
      case 3:
        return <CertificationForm setLocalIsLoading={setLocalIsLoading} />;
      case 4:
        return <AbouttMe />;
      case 5:
        return <OthersForm setLocalIsLoading={setLocalIsLoading} />;
      default:
        return null;
    }
  };
  // const currentTabNumber === 1 ? = (tab) => currentTab === tab;
  return (
    <div className="doctor-register">
      <div className="doctor-container">
        {/* <span>Please complete the form</span> */}
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
            <a className={`nav-link ${currentTabNumber === 4 ? "active" : ""}`}>
              <img src="/assets/Vector (11).svg" alt="" />
              <span>About me</span>
            </a>
          </li>

          <li
            className="nav-item"
            onClick={() => setCurrentTabNumber(5)}
            style={
              currentTabNumber === 5
                ? { backgroundColor: "white", width: "120%" }
                : {}
            }
          >
            <a className={`nav-link ${currentTabNumber === 5 ? "active" : ""}`}>
              <img src="/assets/Vector (10).svg" alt="" />
              <span>Others</span>
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
              <button onClick={removeFromTab} disabled={localIsLoading}>
                Back
              </button>
            )}

            {currentTabNumber !== 5 && (
              <button onClick={addToTab} disabled={localIsLoading}>
                Next
              </button>
            )}
            {currentTabNumber === 5 && (
              <button
                onClick={(e) => {
                  checkFields(e, handleSubmit);
                }}
                disabled={localIsLoading}
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default DoctorRegister;
