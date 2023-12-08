// doctorSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const DEVELOPMENT = "http://localhost:8000";
const PRODUCTION = "https://virtual-med-backend.onrender.com";

const initialState = {
  doctors: [],
  loading: false,
  error: null,
  foundDoctor: null,
};

//THIS IS ESSENTIALLY THE FORMAT WE WILL USE FOR GET REQUESTS. IN THE BACKEND/SRC/ROUTES/STAFF OR USERROUTES THERE ARE LISTS OF ROUTES, THE POST ROUTES MIGHT BE TRICKY RIGHT NOW, BUT WE CAN STILL IMPLEMENT THE GET ROUTES. ESPECIALLY THE ONES WITHOUT MIDDLEWARES.
export const getDoctors = createAsyncThunk("/doctors/get-doctors", async () => {
  try {
    const response = await axios.get(`${DEVELOPMENT}/staff/get-staffs`);

    console.log(response);

    return response.data;
  } catch (error) {
    return Promise.reject(error.response.data);
  }
});

export const getDoctor = createAsyncThunk("/doctors/get-doctor", async (id) => {
  console.log(id)
  try {
    const response = await axios.get(
      `${DEVELOPMENT}/staff/get-staff/${id}`
    );

    console.log(response.data);

    return response.data;
  } catch (error) {
    console.log(error);
    Promise.reject(error.message);
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
      })
      .addCase(getDoctor.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDoctor.fulfilled, (state, action) => {
        state.loading = false;
        state.foundDoctor = action.payload;
      })
      .addCase(getDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setDoctors, addDoctor, removeDoctor, setLoading, setError } =
  doctorSlice.actions;

// Export reducer
export default doctorSlice.reducer;
