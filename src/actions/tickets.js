import * as notifications from "../utils/notification";
import apiService from "../utils/apiService";
import { ticketsPath } from "../utils/endpoints";
import { ticketActions } from "../reducers/ticket";

export const saveCheckoutTickets = (ticket) => {
  return (dispatch) => {
    dispatch(ticketActions.addTicket(ticket));
  };
};
