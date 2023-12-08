import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const PRODUCTION = "https://virtual-med-backend.onrender.com";
const DEVELOPMENT = "http://localhost:8000";

const initialState = {
  user: null,
  loading: false,
  isSuccess: false,
  error: false,
  loadingUserProfile: true,
  doctorAvailableTime: null,
  loadingDoctorAvailableTime: false,
  url: "",
};

export const registerUser = createAsyncThunk(
  "/user/registerUser",
  async ({ firstName, lastName, email, password, phoneNumber }) => {
    // console.log("working")
    try {
      const response = await axios.post(
        `${DEVELOPMENT}/user/register`,
        {
          firstName,
          lastName,
          email,
          password,
          phoneNumber,
        },
        {
          withCredentials: true,
        }
      );

      // Assuming the 'auth' cookie is set by the server

      console.log(response.data.newUser);

      return response.data.newUser;
    } catch (error) {
      console.log(error.response.data);
      return Promise.reject(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "/user/loginUser",
  async ({ email, password }) => {
    try {
      const response = await axios.post(
        `${DEVELOPMENT}/user/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      console.log(response.data);

      return response.data;
    } catch (error) {
      try {
        const response = await axios.post(
          `${DEVELOPMENT}/staff/login`,
          {
            email,
            password,
          },
          {
            withCredentials: true,
          }
        );

        console.log(response.data);

        return response.data;
      } catch (error) {
        console.log(error);
        return Promise.reject(error.response.message);
      }
    }
  }
);

export const myProfile = createAsyncThunk("/user/profile", async () => {
  try {
    const response = await axios.get(`${DEVELOPMENT}/user/profile`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    try {
      const response1 = await axios.get(`${DEVELOPMENT}/staff/profile`, {
        withCredentials: true,
      });

      console.log(response1.data);
      return response1.data;
    } catch (error) {
      return Promise.reject(error.response1.data);
    }
  }
});

export const ConnectUserWithDoctor = createAsyncThunk(
  "/user/connectUserWithDoctor",
  async (staffId) => {
    try {
      const response = await axios.post(
        `${DEVELOPMENT}/user/connectUserWithDoctor`,
        staffId,
        {
          withCredentials: true,
        }
      );

      console.log(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

export const ApproveUserByDoctor = createAsyncThunk(
  "/user/approveUserByDoctor",
  async (userId) => {
    try {
      const response = await axios.post(
        `${DEVELOPMENT}/staff/apporve-pending-patients`,
        userId,
        {
          withCredentials: true,
        }
      );

      console.log(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

export const setUserNickname = createAsyncThunk(
  "/user/setUserNickname",
  async (nickname) => {
    try {
      const response = await axios.post(
        `${DEVELOPMENT}/user/set-nickname`,
        { nickname },
        {
          withCredentials: true,
        }
      );

      console.log(response.data);
      return response.data;
    } catch (e) {
      return Promise.reject(e);
    }
  }
);

export const setStaffAvailability = createAsyncThunk(
  "/staff/setAvailability",
  async (availability, thunkAPI) => {
    try {
      // Loop through each availability slot and make individual API calls
      const responses = await Promise.all(
        availability.map(async (slot) => {
          // Convert the date and time to a single string in the required format
          const startDateTimeString = new Date(
            slot.day + "T" + slot.startTime + ":00"
          ).toLocaleString("en-US", {
            timeZone: "Africa/Lagos", // Adjust this based on the actual time zone in Nigeria
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          });

          const endDateTimeString = new Date(
            slot.day + "T" + slot.endTime + ":00"
          ).toLocaleString("en-US", {
            timeZone: "Africa/Lagos", // Adjust this based on the actual time zone in Nigeria
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          });

          const response = await axios.post(
            `${DEVELOPMENT}/staff/set-available-date`,
            {
              startTime: startDateTimeString,
              endTime: endDateTimeString,
            },
            { withCredentials: true }
          );

          return response.data;
        })
      );

      console.log(responses);

      // Return the array of responses
      return responses;
    } catch (error) {
      // If any individual API call fails, reject the entire operation
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getAvailableTimeForDoctor = createAsyncThunk(
  "/getAvailableTimeForDoctor",
  async (doctorId, thunkAPI) => {
    try {
      const response = await axios.post(
        `${DEVELOPMENT}/user/get-doctor-availability`,
        { doctorId },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const makeAppointment = createAsyncThunk(
  "/makeappointment",
  async ({ doctorId, duration, appointmentTime, notes }, thunkAPI) => {
    try {
      console.log(appointmentTime);
      const response = await axios.post(
        `${DEVELOPMENT}/appointment/makeAppointment`,
        {
          doctorId,
          duration: duration * 60,
          appointmentTime,
          notes,
        },
        {
          withCredentials: true,
        }
      );

      console.log(response.data.data.authorization_url);
      return response.data.data.authorization_url;
    } catch (error) {
      console.log(error.response);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const confirmAppointment = createAsyncThunk(
  "/confirmappointment",
  async (thunkAPI) => {
    try {
      const response = await axios.get(
        `${DEVELOPMENT}/appointment/confirmAppointment`
      );

      console.log(response.data)
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const deleteUser = createAsyncThunk("/user/deleteUser", async () => {});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signOut: (state) => {
      state.user = null;
      state.loading = false;
      state.error = false;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.isSuccess = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;

        console.log(state.user);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.user = action.error.message;
        state.isSuccess = false;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.loading = false;
        state.isSuccess = true;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.isSuccess = false;
        state.error = action.error.message;
      })
      .addCase(myProfile.pending, (state) => {
        state.loading = true;
        state.isSuccess = false;
        state.loadingUserProfile = true;
      })
      .addCase(myProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.isSuccess = true;
        state.loadingUserProfile = false;
      })
      .addCase(myProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.loadingUserProfile = false;
      })
      .addCase(setUserNickname.pending, (state) => {
        state.loading = true;
        state.isSuccess = false;
        state.loadingUserProfile = true;
      })
      .addCase(setUserNickname.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = true;
        state.loadingUserProfile = false;
        state.user = action.payload;

        console.log(state.user);
      })
      .addCase(setUserNickname.rejected, (state, action) => {
        state.error = action.error;
        state.loading = false;
        state.loadingUserProfile = false;
      })
      .addCase(getAvailableTimeForDoctor.pending, (state) => {
        state.loadingDoctorAvailableTime = true;
        // state.isSuccess = false;
      })
      .addCase(getAvailableTimeForDoctor.fulfilled, (state, action) => {
        state.loadingDoctorAvailableTime = false;
        state.isSuccess = true;
        state.doctorAvailableTime = action.payload;
      })
      .addCase(getAvailableTimeForDoctor.rejected, (state, action) => {
        state.loadingDoctorAvailableTime = false;
        state.isSuccess = false;
        state.error = action.error.message;
      })
      .addCase(makeAppointment.fulfilled, (state, action) => {
        state.url = action.payload;
        console.log(state.url);
      });
  },
});

export const { signOut } = userSlice.actions;

export default userSlice.reducer;
