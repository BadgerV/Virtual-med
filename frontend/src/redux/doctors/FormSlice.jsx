import { createSlice } from "@reduxjs/toolkit";

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
  dateOfBirth: "",
  gender: "",
  major: "",
  degree: "",
  university: "",
  graduationDate : null,
  degreeCertificate : ""
};

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
} = formSlice.actions;

export default formSlice.reducer;
