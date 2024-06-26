import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const PRODUCTION = "https://virtual-med-backend.onrender.com";
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
  aboutMe: "",

  staff: null,
  isLoading: false,
  error: null,
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
      const response = await axios.post(`${PRODUCTION}/staff/register`, {
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
      });

      const token = await response.data.newStaff.tokens[
        response.data.newStaff.tokens.length - 1
      ].token;
      console.log(response.data);

      localStorage.setItem("token", token);

      return response.data;
    } catch (e) {
      console.log(e);
      Promise.reject(e.error.message);
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
  extraReducers: (builders) => {
    builders
      .addCase(registerStaff.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerStaff.fulfilled, (state, action) => {
        state.isLoading = false;
        state.staff = action.payload.newStaff;

        console.log(state.staff);
        state.error = null;
      })
      .addCase(registerStaff.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
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
  setAboutMe,
} = formSlice.actions;

export default formSlice.reducer;
