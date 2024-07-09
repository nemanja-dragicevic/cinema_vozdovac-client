import { createSlice } from "@reduxjs/toolkit";

const ticketSlice = createSlice({
  name: "ticket",
  initialState: {
    tickets: [],
    checkout: [],
    booked: [],
    ticketItems: [],
    sessionId: undefined,
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
    deleteWIthProjectionId(state, action) {
      state.checkout = state.checkout.filter(
        (item) => item.projectionId !== action.payload
      );
      state.error = undefined;
    },
    removeSelection(state, action) {
      state.checkout = state.checkout.filter(
        (item) =>
          item.seatId !== action.payload.id ||
          item.projectionId !== action.payload.projectionId
      );
      state.error = undefined;
    },
    addTicketItem(state, action) {
      const { checkout } = state;
      return {
        ...state,
        checkout: [...checkout, ...action.payload],
        error: undefined,
      };
    },
    setTickets(state, action) {
      state.tickets = action.payload;
      state.error = undefined;
    },
    updateTicket(state, action) {
      state.tickets = state.tickets?.map((ticket) =>
        ticket.id === action.payload.id ? action.payload : ticket
      );
      state.error = undefined;
    },
    setTicketItems(state, action) {
      state.ticketItems = action.payload;
      state.error = undefined;
    },
    setSessionId(state, action) {
      state.sessionId = action.payload;
      state.error = undefined;
    },
    removeTicket(state, action) {
      state.tickets = state.tickets.filter(
        (ticket) => ticket.id !== action.payload
      );
      state.error = undefined;
    },
    setBooked(state, action) {
      state.booked = action.payload;
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
