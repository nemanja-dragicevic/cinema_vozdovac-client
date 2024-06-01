import { createSlice } from "@reduxjs/toolkit";

const projectionsSlice = createSlice({
  name: "projections",
  initialState: {
    projections: [],
    projection: undefined,
    error: undefined,
  },

  reducers: {
    fetchMovies(state, action) {
      state.projections = action.payload;
      state.error = undefined;
    },
    setMovie(state, action) {
      state.movie = action.payload;
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
    deleteMovie(state, action) {
      state.projections = state.projections.filter(
        (movie) => movie.movieID !== action.payload
      );
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
