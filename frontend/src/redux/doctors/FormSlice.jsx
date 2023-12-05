import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const DEVELOPMENT = "http://localhost:8000";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  yearsOfExperience: "",
  phoneNumber: "",
  medicalLisense: "",
  boardCertification: "",
  speciality: "",
  passportImage: "",
  location: "",
  hourlyPrice: "",
  dateOfBirth: null,
  gender: "",
  major: "",
  degree: "",
  university: "",
  graduationDate: null,
  degreeCertificate: "",
  POMI: "",
  CV: "",
  proofOfIdentity: "",
  aboutMe : ""
};

export const registerStaff = createAsyncThunk(
  "staff/registerStaff", // <-- Corrected thunk type
  async ({
    firstName,
    lastName,
    email,
    password,
    phoneNumber,
    medicalLisense,
    speciality,
    hourlyPrice,
    passportImage,
    dateOfBirth,
    location,
    boardCertification,
    major,
    degree,
    university,
    graduationDate,
    degreeCertificate,
    POMI,
    CV,
    proofOfIdentity,
    aboutMe,
  }) => {
    try {
        const response = await axios.post(
          `${DEVELOPMENT}/staff/register`,
          {
            firstName,
            lastName,
            email,
            password,
            phoneNumber,
            medicalLisense,
            proofOfIdentity,
            speciality,
            hourlyPrice,
            passportImage,
            dateOfBirth,
            location,
            boardCertification,
            major,
            degree,
            university,
            graduationDate,
            degreeCertificate,
            POMI,
            CV,
            aboutMe,
          },
          {
            withCredentials: true,
          }
        );

        console.log(response)
    } catch (e) {
      console.log(e.message)
      Promise.reject(e.error.message)
    }
  }
);


const generateSetReducer = (property) => {
  return (state, action) => {
    state[property] = action.payload;
  };
};

const reducers = {};
Object.keys(initialState).forEach((property) => {
  reducers[`set${property.charAt(0).toUpperCase()}${property.slice(1)}`] =
    generateSetReducer(property);
});

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers,
});

export const {
  setFirstName,
  setLastName,
  setEmail,
  setPassword,
  setYearsOfExperience,
  setPhoneNumber,
  setMedicalLisense,
  setBoardCertification,
  setSpeciality,
  setPassportImage,
  setLocation,
  setHourlyPrice,
  setAge,
  setGender,
  setMajor,
  setDegree,
  setUniversity,
  setGraduationDate,
  setDegreeCertificate,
  setPOMI,
  setCV,
  setDateOfBirth,
  setProofOfIdentity,
  setAboutMe
} = formSlice.actions;

export default formSlice.reducer;
