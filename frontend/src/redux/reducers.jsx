
import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './user/UserSlice';
import doctorReducer from './doctors/DoctorsSlice';

const rootReducer = combineReducers({
  user: userReducer,
  doctor: doctorReducer,
});

export default rootReducer;
