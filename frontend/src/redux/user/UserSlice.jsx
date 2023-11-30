import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// import Cookies from "js-cookie";

// Your registration request code here...

// Now you can use authToken as needed in your frontend code

const DEVELOPMENT = "http://localhost:8000";

const initialState = {
  user: null,
  loading: false,
  isSuccess: false,
  error: false,
  loadingUserProfile : true
};

export const registerUser = createAsyncThunk(
  "/user/registerUser",
  async ({ firstName, lastName, nickName, email, password, phoneNumber }) => {
    try {
      const response = await axios.post(
        `${DEVELOPMENT}/user/register`,
        {
          firstName,
          lastName,
          email,
          password,
          phoneNumber,
          nickName,
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
const loginUser = createAsyncThunk(
  "/user/loginUser",
  async ({ email, password }) => {
    try {
      const response = await axios.post(
        `${DEVELOPMENT}/user/register`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      // Assuming the 'auth' cookie is set by the server
      console.log(response.data.user);

      return response.data.user;
    } catch (error) {
      console.log(error.response.data);
      return Promise.reject(error.response.data);
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
    await Promise.all(error);
  }
});
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
        state.isLoading = true;
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
        state.isLoading = false;
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
