import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const DEVELOPMENT = "http://localhost:8000";
const PROD = "https://virtual-med-backend.onrender.com"

const initialState = {
  upcomingAppointments: null,
  completedAppointments: null,
  ongoingAppointments: null,
  loadingAppointment: false,
  error: null,
};

export const getUpcomingAppointment = createAsyncThunk(
  "get-upcoming-appointment",
  async (thunkAPI) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(
        `${PROD}/appointment/get-upcoming-appointments`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getOngoingAppointment = createAsyncThunk(
  "/get-ongoing-appointment",
  async (thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${PROD}/appointment/get-ongoing-appointments`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getCompletedAppointments = createAsyncThunk(
  "/get-completed-appointments",
  async (thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${PROD}/appointment/get-completed-appointments`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {},
  extraReducers: (buidler) => {
    buidler
      .addCase(getUpcomingAppointment.pending, (state) => {
        state.loadingAppointment = true;
      })
      .addCase(getUpcomingAppointment.fulfilled, (state, action) => {
        state.loadingAppointment = false;
        state.upcomingAppointments = action.payload;
      })
      .addCase(getUpcomingAppointment.rejected, (state, action) => {
        state.loadingAppointment = false;
        state.error = action.payload.message;
      })
      .addCase(getCompletedAppointments.pending, (state) => {
        state.loadingAppointment = true;
      })
      .addCase(getCompletedAppointments.fulfilled, (state, action) => {
        state.completedAppointments = action.payload;
        state.loadingAppointment = false;
      })
      .addCase(getCompletedAppointments.rejected, (state, action) => {
        state.loadingAppointment = false;
        state.error = action.payload.message;
      })
      .addCase(getOngoingAppointment.pending, (state) => {
        state.loadingAppointment = true;
      })
      .addCase(getOngoingAppointment.fulfilled, (state, action) => {
        state.loadingAppointment = false;
        state.ongoingAppointments = action.payload;
      })
      .addCase(getOngoingAppointment.rejected, (state, action) => {
        state.loadingAppointment = false;
        state.error = action.payload.message;
      });
  },
});

export default appointmentSlice.reducer;
