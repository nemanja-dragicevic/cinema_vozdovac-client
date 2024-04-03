import { membersActions } from "../reducers/member";
import { loginPath, registerPath } from "../utils/endpoints";
import apiService from "./../utils/apiService";
import * as notifications from "../utils/notification";

export const login = (data) => {
    return (dispatch) => {
        dispatch(membersActions.actionStart());
        return apiService
          .post(loginPath, { ...data })
          .then((response) => {
            dispatch(membersActions.fetchMember(response.data));
            notifications.prikaz('Successfully logged in');
          })
          .catch((error) => {
            dispatch(membersActions.actionError(error?.response?.data));
            notifications.prikaz(error?.response?.data);
          });
      };
}

export const register = (data) => {
  return (dispatch) => {
      dispatch(membersActions.actionStart());
      return apiService
        .post(registerPath, { ...data })
        .then((response) => {
          dispatch(membersActions.fetchMember(response.data));
          notifications.prikaz('Successfully registered');
        })
        .catch((error) => {
          dispatch(membersActions.actionError(error?.response?.data));
          notifications.prikaz(error?.response?.data);
        });
    };
}
