import { createSlice } from "@reduxjs/toolkit";

const membersSlice = createSlice({
  name: "member",
  initialState: {
    members: [],
    member: undefined,
    error: undefined,
  },

  reducers: {
    fetchMember(state, action) {
      state.member = action.payload;
      state.error = undefined;
    },
    fetchMembers(state, action) {
      state.members = action.payload;
      state.error = undefined;
    },
    addMember(state, action) {
      state.members = [action.payload].concat(state.members);
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

export const membersActions = membersSlice.actions;
export default membersSlice.reducer;
