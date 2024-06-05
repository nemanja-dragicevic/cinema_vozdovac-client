import { createSlice } from "@reduxjs/toolkit";

const projectionsSlice = createSlice({
  name: "projections",
  initialState: {
    projections: [],
    times: [],
    projection: undefined,
    error: undefined,
  },

  reducers: {
    fetchProjections(state, action) {
      state.projections = action.payload;
      state.error = undefined;
    },
    setProjection(state, action) {
      state.projection = state.projections.find(
        (projection) => projection.id === action.payload
      );
      state.error = undefined;
    },
    addMovie(state, action) {
      state.projections = [action.payload].concat(state.projections);
      state.error = undefined;
    },
    editMovie(state, action) {
      state.projections = state.projections.map((movie) =>
        movie.movieID === action.payload.movieID ? action.payload : movie
      );
      state.error = undefined;
    },
    deleteProjection(state, action) {
      state.projections = state.projections.filter(
        (projection) => projection.id !== action.payload
      );
      state.error = undefined;
    },

    fetchTimes(state, action) {
      state.times = action.payload;
      state.error = undefined;
    },
    actionStart(state) {
      state.error = undefined;
    },
    actionError(state, action) {
      state.error = action.payload;
    },
    clearError(state) {
      state.error = undefined;
    },
  },
});

export const projectionsActions = projectionsSlice.actions;
export default projectionsSlice.reducer;
