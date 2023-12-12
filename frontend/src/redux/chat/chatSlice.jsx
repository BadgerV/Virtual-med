// doctorSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// import axios from "axios";

const DEVELOPMENT = "http://localhost:8000";
// var socket, selectedChatCompared;

const initialState = {
  chat: null,
  searchResult: [],
  loading: false,
  loadingChat: false,
  error: null,
};

//THIS IS ESSENTIALLY THE FORMAT WE WILL USE FOR GET REQUESTS. IN THE BACKEND/SRC/ROUTES/STAFF OR USERROUTES THERE ARE LISTS OF ROUTES, THE POST ROUTES MIGHT BE TRICKY RIGHT NOW, BUT WE CAN STILL IMPLEMENT THE GET ROUTES. ESPECIALLY THE ONES WITHOUT MIDDLEWARES.

// const { data } = await axios.get(`/api/user?search=${search}`, config);
// export const searchChats = createAsyncThunk(
//   "/chat/getChats",
//   async (search) => {
//     const { data } = await axios.get(`/api/user?search=${search}`, {
//       withCredentials: true,
//     });

//     console.log(data);
//   }
// );

// export const getChats = createAsyncThunk("/chat/getChats", async (userId) => {
//   const { data } = await axios.post(
//     `${DEVELOPMENT}/chat/`,
//     { userId },
//     {
//       withCredentials: true,
//     }
//   );

//   console.log(data);
// });

export const fetchChats = createAsyncThunk("/chat/fetchChats", async () => {
  try {
    const response = await axios.get(`${DEVELOPMENT}/chat/fetchChats`, {
      withCredentials: true,
    });

    console.log(response);
  } catch (error) {
    return Promise.reject(error);
  }
});

export const createCommunity = createAsyncThunk(
  "/chat/createCommunity",
  async (name) => {
    try {
      const response = axios.post(
        `${DEVELOPMENT}/chat/community/create`,
        name,
        {
          withCredentials: true,
        }
      );

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
);

export const addUsersToCommunity = createAsyncThunk(
  "/chat/addUsersToCommunity",
  async ({ chatId }) => {
    try {
      const response = await axios.put(
        `${DEVELOPMENT}/chat/communityAdd`,
        {
          chatId: chatId,
        },
        {
          withCredentials: true,
        }
      );

      console.log(response);
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  }
);

export const removeUserFromCOmmunity = createAsyncThunk(
  "/chat/removeUserFromCommunity",
  async ({ chatId, userId }) => {
    try {
      const response = await axios.put(
        `${DEVELOPMENT}/chat/communityRemove`,
        {
          chatId: chatId,
          userId: userId,
        },
        {
          withCredentials: true,
        }
      );

      console.log(response);
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  }
);

export const sendMessage = createAsyncThunk(
  "/chat/message/sendMessage",
  async ({ chatId, content }) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        `${DEVELOPMENT}/message/sendMessage`,
        { chatId: chatId, content: content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response);
    } catch (error) {
      console.log(error);
      Promise.reject(error);
    }
  }
);

export const getAllMessages = createAsyncThunk(
  "get-all-messages",
  async (id, thunkAPI) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${DEVELOPMENT}/message/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // console.log(response);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllMessages.pending, (state) => {
        state.loadingChat = true;
      })
      .addCase(getAllMessages.fulfilled, (state, action) => {
        state.chat = action.payload;
        state.loadingChat = false;
      })
      .addCase(getAllMessages.rejected, (state, action) => {
        state.loadingChat = true;
        state.error = action.payload;
      })
      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false;
        console.log(action.payload);
      });
  },
});

// Export reducer
export default chatSlice.reducer;
