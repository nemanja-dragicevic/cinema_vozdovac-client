import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./movies";
// import { thunk } from "redux-thunk";

const store = configureStore({
  reducer: {
    moviesReducer,
  },
});

export default store;
