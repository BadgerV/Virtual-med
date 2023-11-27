// doctorSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const DEVELOPMENT = "http://localhost:8000";

const initialState = {
  doctors: [],
  loading: false,
  error: null,
};


//THIS IS ESSENTIALLY THE FORMAT WE WILL USE FOR GET REQUESTS. IN THE BACKEND/SRC/ROUTES/STAFF OR USERROUTES THERE ARE LISTS OF ROUTES, THE POST ROUTES MIGHT BE TRICKY RIGHT NOW, BUT WE CAN STILL IMPLEMENT THE GET ROUTES. ESPECIALLY THE ONES WITHOUT MIDDLEWARES.
export const getDoctors = createAsyncThunk("/doctors/get-doctors", async () => {
  try {
    const response = await axios.get(`${DEVELOPMENT}/staff/get-staffs`);

    return response.data;
  } catch (error) {
    return Promise.reject(error.response.data);
  }
});

const doctorSlice = createSlice({
  name: "doctor",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builders) => {
    builders
      .addCase(getDoctors.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDoctors.fulfilled, (state, action) => {
        state.loading = false;
        state.doctors = action.payload;
      })
      .addCase(getDoctors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      });
  },
});

export const { setDoctors, addDoctor, removeDoctor, setLoading, setError } =
  doctorSlice.actions;

// Export reducer
export default doctorSlice.reducer;
