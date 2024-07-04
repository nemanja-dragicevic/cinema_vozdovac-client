import * as notifications from "../utils/notification";
import apiService from "../utils/apiService";
import { ticketsPath } from "../utils/endpoints";
import { ticketActions } from "../reducers/ticket";

export const saveCheckoutTickets = (ticketItem, projectionId) => {
  return (dispatch) => {
    dispatch(ticketActions.deleteWIthProjectionId(projectionId));
    dispatch(ticketActions.addTicketItem(ticketItem));
  };
};

export const removeSelection = (id, projectionId) => {
  return (dispatch) => {
    dispatch(ticketActions.removeSelection({ id, projectionId }));
  };
};
