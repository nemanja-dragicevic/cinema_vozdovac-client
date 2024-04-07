import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./movies";
import membersReducer from "./member";
import rolesReducer from "./roles";
// import { thunk } from "redux-thunk";

const store = configureStore({
  reducer: {
    moviesReducer,
    membersReducer,
    rolesReducer,
  },
});

export default store;
