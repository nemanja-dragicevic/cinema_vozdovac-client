import { createSlice } from "@reduxjs/toolkit";

const ticketSlice = createSlice({
  name: "ticket",
  initialState: {
    tickets: [],
    checkout: [],
    ticket: undefined,
    error: undefined,
  },

  reducers: {
    fetchTickets(state, action) {
      state.tickets = action.payload;
      state.error = undefined;
    },
    setTicket(state, action) {
      state.ticket = action.payload;
      state.error = undefined;
    },
    addTicket(state, action) {
      state.checkout = [action.payload].concat(state.tickets);
      state.error = undefined;
    },
    deleteTicket(state, action) {
      state.ticket = state.ticket.filter(
        (ticket) => ticket.id !== action.payload
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

export const ticketActions = ticketSlice.actions;
export default ticketSlice.reducer;
