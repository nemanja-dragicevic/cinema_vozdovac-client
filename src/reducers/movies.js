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
    editMovie(state, action) {
      state.movies = state.movies.map((movie) =>
        movie.movieID === action.payload.movieID ? action.payload : movie
      );
      state.error = undefined;
    },
    deleteMovie(state, action) {
      state.movies = state.movies.filter(
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

export const moviesActions = moviesSlice.actions;
export default moviesSlice.reducer;
