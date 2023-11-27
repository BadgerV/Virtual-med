import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loading: false,
  isSuccess: false,
  error: false,
};

const registerUser = createAsyncThunk("/user/registerUser", async () => {});
const loginUser = createAsyncThunk("/user/loginUser", async () => {});
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
