import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const DEVELOPMENT = "http://localhost:8000";
const PROD = "https://virtual-med-backend.onrender.com";


const initialState = {
  notification: null,
  loading: false,
  error: null,
  notificationID: null,
  allNotifcations: [],
};

export const getNotificationFromId = createAsyncThunk(
  "notification/get-notification", // Corrected the action name
  async (id, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${PROD}/notification/get-notification-byID?id=${id}`, // Corrected the URL and added the correct parameter format
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

export const getAllNotifications = createAsyncThunk(
  "/get-all-notifications",
  async (thunkAPI) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(`${PROD}/user/notifcations`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      thunkAPI.rejectWithValue(error.error.message);
    }
  }
);

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification: (state, action) => {
      state.notificationID = action.payload;
      console.log(state.notificationID);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNotificationFromId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getNotificationFromId.fulfilled, (state, action) => {
        state.loading = false;
        state.notification = action.payload;
      })
      .addCase(getNotificationFromId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export const { setNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
