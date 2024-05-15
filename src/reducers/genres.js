import { createSlice } from "@reduxjs/toolkit";

const genresSlice = createSlice({
  name: "genres",
  initialState: {
    genres: [],
    genre: undefined,
    error: undefined,
  },

  reducers: {
    fetchGenres(state, action) {
      state.genres = action.payload;
      state.error = undefined;
    },
    saveGenre(state, action) {
      state.genres.push(action.payload);
      state.error = undefined;
    },
    updateGenre(state, action) {
      state.genres = state.genres.map((genre) =>
        genre.genreID === action.payload.genreID ? action.payload : genre
      );
      state.error = undefined;
    },
    deleteGenre(state, action) {
      state.genres = state.genres.filter((genre) => genre.genreID !== action.payload);
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

export const genresActions = genresSlice.actions;
export default genresSlice.reducer;
