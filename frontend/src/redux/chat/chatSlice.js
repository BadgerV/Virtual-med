// doctorSlice.js
import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

// const DEVELOPMENT = "http://localhost:8000";
// var socket, selectedChatCompared;

const initialState = {
  chat: null,
  searchResult : [],
  loading : false,
  loadingChat : false
};

//THIS IS ESSENTIALLY THE FORMAT WE WILL USE FOR GET REQUESTS. IN THE BACKEND/SRC/ROUTES/STAFF OR USERROUTES THERE ARE LISTS OF ROUTES, THE POST ROUTES MIGHT BE TRICKY RIGHT NOW, BUT WE CAN STILL IMPLEMENT THE GET ROUTES. ESPECIALLY THE ONES WITHOUT MIDDLEWARES.

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {},
});

// Export reducer
export default chatSlice.reducer;
