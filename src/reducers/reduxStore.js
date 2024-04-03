import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./movies";
import membersReducer from './member';
// import { thunk } from "redux-thunk";

const store = configureStore({
  reducer: {
    moviesReducer,
    membersReducer,
  },
});

export default store;
