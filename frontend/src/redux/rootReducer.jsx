import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./user/UserSlice";
import doctorReducer from "./doctors/DoctorsSlice";

const rootReducer = combineReducers({
  userSlice: userReducer,
  doctorSlice: doctorReducer,
});

export default rootReducer;
