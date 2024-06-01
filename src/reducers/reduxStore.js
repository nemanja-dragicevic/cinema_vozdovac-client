import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./movies";
import membersReducer from "./member";
import rolesReducer from "./roles";
import actorsReducer from "./actors";
import hallReducer from "./hall";
import genresReducer from "./genres";
import projectionsReducer from "./projections";
// import { thunk } from "redux-thunk";

const store = configureStore({
  reducer: {
    moviesReducer,
    membersReducer,
    rolesReducer,
    actorsReducer,
    hallReducer,
    genresReducer,
    projectionsReducer,
  },
});

export default store;
