import * as notifications from "../utils/notification";
import apiService from "../utils/apiService";
import { capturePayment, checkout, ticket } from "../utils/endpoints";
import { ticketActions } from "../reducers/ticket";
import { redirect401Error } from "../utils/redirect401Error";

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

export const checkoutTicket = (ticket) => {
  return (dispatch) => {
    dispatch(ticketActions.actionStart());
    return apiService
      .post(checkout, ticket)
      .then((response) => {
        // dispatch(ticketActions.setSessionId(response.data.data.sessionId));
        sessionStorage.setItem(
          "sessionID",
          JSON.stringify(response.data.data.sessionId)
        );
        window.location = response.data.data.sessionUrl;
      })
      .catch((error) => {
        dispatch(ticketActions.actionError(error?.response?.data));
        notifications.error();
        // setTimeout(() => {
        //   window.location = "/register";
        // }, 3000);
      });
  };
};

export const saveCheckoutTicket = (sessionID) => {
  return (dispatch) => {
    dispatch(ticketActions.actionStart());
    return apiService
      .post(capturePayment, {
        sessionId: sessionID,
      })
      .then((response) => {
        dispatch(ticketActions.setTicket(response.data.data));
        sessionStorage.removeItem("sessionID");
        notifications.success(
          "Payment successful! Redirecting to home page..."
        );
        setTimeout(() => {
          window.location = "/";
        }, 3000);
      })
      .catch((error) => {
        dispatch(ticketActions.actionError(error?.response?.data));
        notifications.error();
      });
  };
};

export const getTickets = (id) => {
  return (dispatch) => {
    dispatch(ticketActions.actionStart());
    return apiService
      .get(`${ticket}/${id}`)
      .then((response) => {
        dispatch(ticketActions.setTickets(response.data));
      })
      .catch((error) => {
        dispatch(ticketActions.actionError(error?.response?.data));
        notifications.error();
        redirect401Error(error);
      });
  };
};

export const getTicketItems = (id) => {
  return (dispatch) => {
    dispatch(ticketActions.actionStart());
    return apiService
      .get(`${ticket}/items/${id}`)
      .then((response) => {
        dispatch(ticketActions.setTicketItems(response.data));
      })
      .catch((error) => {
        dispatch(ticketActions.actionError(error?.response?.data));
        notifications.error();
      });
  };
};
