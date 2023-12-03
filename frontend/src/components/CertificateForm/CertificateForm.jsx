import { useState, useEffect } from "react";
import axios from "axios";
import "./certificateForm.css";
import { useDispatch } from "react-redux";

import {
  setMedicalLisense as setmedicallisense,
  setBoardCertification as setboardcertification,
  setPOMI as setpomi,
  setCV as setcv,
} from "../../redux/doctors/FormSlice";

const CertificationForm = () => {
  const dispatch = useDispatch();

  const [medicalLisense, setMedicalLisense] = useState(null);
  const [boardCertification, setBoardCertification] = useState(null);
  const [POMI, setPOMI] = useState(null);
  const [CV, setCV] = useState(null);

  const [medicalLisenseLink, setMedicalLisenseLink] = useState("");
  const [boardCertificationLink, setBoardCertificationLink] = useState("");
  const [POMILink, setPOMILink] = useState("");
  const [CVLink, setCVLink] = useState("");

  const handleUpload = (file, setLinkState) => {
    const formData = new FormData();
    formData.append("file", file);
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

  const handleFileChange = (name, file, setLinkState) => {
    if (file) {
      setLinkState(""); // Clear the link when a new file is selected
      handleUpload(file, setLinkState);
    }
  };

  useEffect(() => {
    dispatch(setmedicallisense(medicalLisenseLink));
  }, [medicalLisenseLink]);
  useEffect(() => {
    dispatch(setboardcertification(boardCertificationLink));
  }, [boardCertificationLink]);
  useEffect(() => {
    dispatch(setpomi(POMILink));
  }, [POMILink]);
  useEffect(() => {
    dispatch(setcv(CVLink));
  }, [CVLink]);

  return (
    <div className="certification-form">
      {/* Medical Lisense */}
      <div className="cert-label-and-input">
        <label htmlFor="medicalLisense">Medical lisense *</label>
        <div className="cert-input-file-container">
          <input
            type="file"
            name="medicalLisense"
            onChange={(e) => {
              setMedicalLisense(e.target.files[0]);
              handleFileChange(
                "medicalLisense",
                e.target.files[0],
                setMedicalLisenseLink
              );
            }}
          />
          <img src="/assets/cloud-icon.svg" alt="" />
          <div className="cert-input-chaarde">
            {medicalLisense
              ? medicalLisense.name
              : "Upload File (max file size 2mb)"}
          </div>
        </div>
      </div>

      {/* Board Certification */}
      <div className="cert-label-and-input">
        <label htmlFor="boardCertification">Board certification *</label>
        <div className="cert-input-file-container">
          <input
            type="file"
            name="boardCertification"
            onChange={(e) => {
              setBoardCertification(e.target.files[0]);
              handleFileChange(
                "boardCertification",
                e.target.files[0],
                setBoardCertificationLink
              );
            }}
          />
          <img src="/assets/cloud-icon.svg" alt="" />
          <div className="cert-input-chaarde">
            {boardCertification
              ? boardCertification.name
              : "Upload File (max file size 2mb)"}
          </div>
        </div>
      </div>

      {/* Proof of Malpractice Insurance */}
      <div className="cert-label-and-input">
        <label htmlFor="POMI">Proof of malpractice insurance</label>
        <div className="cert-input-file-container">
          <input
            type="file"
            name="POMI"
            onChange={(e) => {
              setPOMI(e.target.files[0]);
              handleFileChange("POMI", e.target.files[0], setPOMILink);
            }}
          />
          <img src="/assets/cloud-icon.svg" alt="" />
          <div className="cert-input-chaarde">
            {POMI ? POMI.name : "Upload File (max file size 2mb)"}
          </div>
        </div>
      </div>

      {/* Curriculum Vitae */}
      <div className="cert-label-and-input">
        <label htmlFor="CV">Curriculum vitae</label>
        <div className="cert-input-file-container">
          <input
            type="file"
            name="CV"
            onChange={(e) => {
              setCV(e.target.files[0]);
              handleFileChange("CV", e.target.files[0], setCVLink);
            }}
          />
          <img src="/assets/cloud-icon.svg" alt="" />
          <div className="cert-input-chaarde">
            {CV ? CV.name : "Upload File (max file size 2mb)"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificationForm;

{
  /* <div className="education-duo-inputs-container">
        <label>Date of graduation *</label>

        <div className="education-duo-inputs">
          <Select
            className="trade"
            styles={customStyles}
            options={options}
            placeholder="Month"
            components={{
              IndicatorSeparator: () => null,
              DropdownIndicator: () => (
                <img src="/assets/CaretDown.svg" alt="" />
              ),
            }}
          />

          <Select
            className="trade"
            styles={customStyles}
            options={options}
            placeholder="Year"
            components={{
              IndicatorSeparator: () => null,
              DropdownIndicator: () => (
                <img src="/assets/CaretDown.svg" alt="" />
              ),
            }}
          />
        </div>
      </div>

      <div className="education-label_and_input">
        <label>Certification *</label>
        <input type="text" />
      </div>

      <div className="education-label_and_input">
        <label>Issuing body *</label>
        <input type="text" />
      </div>

      <div className="checkbox-cont">
        <input type="checkbox" />
        <span>I don’t hold any medical certification</span>
      </div>

      {/* <div className="work-button-cont">
        <button>back</button>
        <button>next</button>
      </div> */
}
