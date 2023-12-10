import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const DEVELOPMENT = "http://localhost:8000";

const initialState = {
  notificationID: "",
  loading : false,
  
};

export const getNotificationFromId = createAsyncThunk(
  "notification/get-notification", // Corrected the action name
  async (id, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${DEVELOPMENT}/notification/get-notification-byID?id=${id}`, // Corrected the URL and added the correct parameter format
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

const notificationSlice = createSlice({
  name: "notification",
  initialState ,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getNotificationFromId.pending, (state,action) => {
      state
    })
  },
});

export default notificationSlice.reducer;
