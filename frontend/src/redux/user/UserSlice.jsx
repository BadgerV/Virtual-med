import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const DEVELOPMENT = "http://localhost:8000";

const initialState = {
  user: null,
  loading: false,
  isSuccess: false,
  error: false,
  loadingUserProfile: true,
};

export const registerUser = createAsyncThunk(
  "/user/registerUser",
  async ({ firstName, lastName, nickName, email, password, phoneNumber }) => {
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

      return response.data;
    } catch (error) {
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

        console.log(response);

        return response.data;
      } catch (error) {
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
const deleteUser = createAsyncThunk("/user/deleteUser", async () => {});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // signInStart: (state) => {
    //   state.loading = true;
    // },
    // signInSuccess: (state, action) => {
    //   state.user = action.payload;
    //   state.loading = false;
    //   state.error = false;
    // },
    // signInFailure: (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload;
    // },
    // updateUserStart: (state) => {
    //   state.loading = true;
    // },
    // updateUserSuccess: (state, action) => {
    //   state.user = action.payload;
    //   state.loading = false;
    //   state.error = false;
    // },
    // updateUserFailure: (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload;
    // },
    // deleteUserStart: (state) => {
    //   state.loading = true;
    // },
    // deleteUserSuccess: (state) => {
    //   state.user = null;
    //   state.loading = false;
    //   state.error = false;
    // },
    // deleteUserFailure: (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload;
    // },
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
      });
  },
});

export const {
  // signInStart,
  // signinSuccess,
  // signInFailure,
  // updateUserFailure,
  // updateUserStart,
  // updateUserSuccess,
  // deleteUserFailure,
  // deleteUserStart,
  // deleteUserSuccess,
  signOut,
} = userSlice.actions;

export default userSlice.reducer;
