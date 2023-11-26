// doctorSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  doctors: [],
  loading: false,
  error: null,
};

const doctorSlice = createSlice({
  name: 'doctor',
  initialState,
  reducers: {
    setDoctors: (state, action) => {
      state.doctors = action.payload;
    },
    addDoctor: (state, action) => {
      state.doctors.push(action.payload);
    },
    removeDoctor: (state, action) => {
      state.doctors = state.doctors.filter((doctor) => doctor.id !== action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setDoctors, addDoctor, removeDoctor, setLoading, setError } = doctorSlice.actions;

// Export reducer
export default doctorSlice.reducer;