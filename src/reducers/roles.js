import { createSlice } from "@reduxjs/toolkit";

const rolesSlice = createSlice({
  name: "role",
  initialState: {
    roles: undefined,
    error: undefined,
  },
  reducers: {
    fetchRoles(state, action) {
      state.roles = action.payload;
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

export const rolesActions = rolesSlice.actions;
export default rolesSlice.reducer;
