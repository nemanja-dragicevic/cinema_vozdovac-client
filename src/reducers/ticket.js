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
    deleteWIthProjectionId(state, action) {
      state.checkout = state.checkout.filter(
        (item) => item.projectionId !== action.payload
      );
      state.error = undefined;
    },
    addTicketItem(state, action) {
      // state.checkout = state.checkout.push(action.payload);
      // state.error = undefined;
      const { checkout } = state;

      // // Filter out any existing ticket items with the same projectionId
      // const updatedCheckout = checkout.filter(
      //   (item) =>
      //     item.ticketItem[0].projectionId !==
      //     action.payload.ticketItem[0].projectionId
      // );

      // // Push the new action.payload (new ticket item) to the filtered array
      // updatedCheckout.push(action.payload);

      // // Update the state with the new checkout array and clear any errors
      // return {
      //   ...state,
      //   checkout: updatedCheckout,
      //   error: undefined,
      // };

      // const updatedCheckout = checkout.filter(
      //   (item) => item.projectionId !== action.payload.projectionId
      // );
      // // updatedCheckout.push(action.payload);
      // updatedCheckout.concat(action.payload);

      // return {
      //   ...state,
      //   checkout: updatedCheckout,
      //   error: undefined,
      // };
      return {
        ...state,
        checkout: [...checkout, ...action.payload],
        error: undefined,
      };
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
