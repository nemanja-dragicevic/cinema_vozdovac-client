import { createSlice } from "@reduxjs/toolkit";

const actorsSlice = createSlice({
  name: "actor",
  initialState: {
    actors: [],
    actor: undefined,
    error: undefined,
  },

  reducers: {
    fetchActor(state, action) {
      state.actor = action.payload;
      state.error = undefined;
    },
    fetchActors(state, action) {
      state.actors = action.payload;
      state.error = undefined;
    },
    saveActor(state, action) {
      state.actors = [action.payload].concat(state.actors);
      state.error = undefined;
    },
    updateActor(state, action) {
      state.actors = state.actors?.map((actor) =>
        actor.actorID === action.payload.actorID ? action.payload : actor
      );
      state.error = undefined;
    },
    deleteActor(state, action) {
      state.actors = state.actors.filter(
        (actor) => actor.actorID !== action.payload
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

export const actorsActions = actorsSlice.actions;
export default actorsSlice.reducer;
