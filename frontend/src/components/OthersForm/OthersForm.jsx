import { useEffect, useState } from "react";
import "./othersForm.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setHourlyPrice as sethourlyprice,
  setLocation as setlocation,
  setPassportImage as setpassportimage,
  setProofOfIdentity as setproofofidentity,
  setPhoneNumber as setphonenumber,
  setSpeciality as setspeciality,
} from "../../redux/doctors/FormSlice";

const OthersForm = () => {
  const dispatch = useDispatch();

  const [proof, setProof] = useState(null);
  const [passport, setPassport] = useState(null);

  const [location, setLocation] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [hourlyPrice, setHourlyPrice] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [proofLink, setProofLink] = useState("");
  const [passportLink, setPassportLink] = useState("");

  const handleProofUpload = (file, setLinkState) => {
    const formData = new FormData();
    formData.append("file", proof);
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

  useEffect(() => {
    dispatch(setproofofidentity(proofLink));
  }, [proofLink]);

  useEffect(() => {
    dispatch(setpassportimage(passportLink));
  }, [passportLink]);

  useEffect(() => {
    dispatch(setphonenumber(phoneNumber));
  }, [phoneNumber]);
  useEffect(() => {
    dispatch(setlocation(location));
  }, [location]);
  useEffect(() => {
    dispatch(sethourlyprice(hourlyPrice));
  }, [hourlyPrice]);

  useEffect(() => {
    dispatch(setspeciality(speciality));
  }, [speciality]);

  useEffect(() => {
    if (proof !== null) {
      handleProofUpload(proof, setProofLink);
    }
  }, [proof]);

  useEffect(() => {
    if (passport !== null) {
      handleProofUpload(passport, setPassportLink);
    }
  }, [passport]);

  return (
    <div className="others-form">
      <div className="others-form_proof-div">
        <label htmlFor="">Proof of identity *</label>
        <input
          type="file"
          onChange={(e) => {
            setProof(e.target.files[0]);
          }}
        />
        <span className="others-fake_container">
          {proof ? proof.name : "Proof of identity"}
        </span>
      </div>
      <div className="others-form_proof-div">
        <label htmlFor="">Professional Passport *</label>
        <input
          type="file"
          onChange={(e) => {
            setPassport(e.target.files[0]);
          }}
        />
        <span className="others-fake_container">Professional passport</span>
      </div>

      <div className="others-together_form">
        <label htmlFor="Phone number">Phone number *</label>
        <input type="text" onChange={(e) => setPhoneNumber(e.target.value)} />
      </div>

      <div className="others-together_form">
        <label htmlFor="Speciality">Speciality *</label>
        <input type="text" onChange={(e) => setSpeciality(e.target.value)} />
      </div>

      <div className="others-together_form">
        <label htmlFor="Location">Location e.g Osogbo, Osun state *</label>
        <input type="text" onChange={(e) => setLocation(e.target.value)} />
      </div>

      <div className="others-together_form">
        <label htmlFor="">Expected hourly price *</label>
        <input type="text" onChange={(e) => setHourlyPrice(e.target.value)} />
      </div>
    </div>
  );
};

export default OthersForm;

// phoneNumber;
// speciality;
// location;
// hourlyPrice;
// proofOfIdentity;
