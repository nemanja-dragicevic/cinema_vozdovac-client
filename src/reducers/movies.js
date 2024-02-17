import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    movie: undefined,
    error: undefined,
  },

  reducers: {
    fetchMovies(state, action) {
      state.movies = action.payload;
      state.error = undefined;
    },
    addMovie(state, action) {
      state.movies = [action.payload].concat(state.movies);
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

export const moviesActions = moviesSlice.actions;
export default moviesSlice.reducer;
