import { createSlice } from "@reduxjs/toolkit";

const hallSlice = createSlice({
  name: "hall",
  initialState: {
    halls: [],
    hall: undefined,
    error: undefined,
  },

  reducers: {
    fetchHalls(state, action) {
      state.halls = action.payload;
      state.error = undefined;
    },
    addHall(state, action) {
      state.halls = [action.payload].concat(state.halls);
      state.error = undefined;
    },
    updateHall(state, action) {
      state.halls = state.halls.map((hall) =>
        hall.hallID === action.payload.hallID ? action.payload : hall
      );
      state.error = undefined;
    },
    deleteHall(state, action) {
      state.halls = state.halls.filter(
        (hall) => hall.hallID !== action.payload
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

export const hallActions = hallSlice.actions;
export default hallSlice.reducer;
