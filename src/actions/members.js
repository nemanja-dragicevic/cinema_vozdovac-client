import { membersActions } from "../reducers/member";
import { loginPath, membersPath, registerPath } from "../utils/endpoints";
import apiService from "./../utils/apiService";
import * as notifications from "../utils/notification";

export const login = (data) => {
  return (dispatch) => {
    dispatch(membersActions.actionStart());
    return apiService
      .post(loginPath, { ...data })
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        sessionStorage.setItem("user", JSON.stringify(response.data));
        dispatch(membersActions.fetchMember(response.data));
        notifications.success("Successfully logged in");
      })
      .catch((error) => {
        dispatch(membersActions.actionError(error?.response?.data));
        notifications.error(error?.response?.data);
      });
  };
};

export const register = (data) => {
  return (dispatch) => {
    dispatch(membersActions.actionStart());
    return apiService
      .post(registerPath, { ...data })
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        sessionStorage.setItem("user", JSON.stringify(response.data));
        dispatch(membersActions.fetchMember(response.data));
        notifications.success("Successfully registered");
      })
      .catch((error) => {
        dispatch(membersActions.actionError(error?.response?.data));
        notifications.error(error?.response?.data);
      });
  };
};

export const updateProfile = (data) => {
  return (dispatch) => {
    dispatch(membersActions.actionStart());
    return apiService
      .put(membersPath, { ...data })
      .then((response) => {
        sessionStorage.setItem("user", JSON.stringify(response.data));
        dispatch(membersActions.fetchMember(response.data));
        notifications.success("Successfully updated profile");
      })
      .catch((error) => {
        dispatch(membersActions.actionError(error?.response?.data));
        notifications.error(error?.response?.data);
      });
  };
};

export const changePassword = (data) => {
  return (dispatch) => {
    dispatch(membersActions.actionStart());
    return apiService
      .put(`${membersPath}/change-pass`, { ...data })
      .then(() => {
        notifications.success("Successfully changed password");
      })
      .catch((error) => {
        dispatch(membersActions.actionError(error?.response?.data));
        notifications.error(error?.response?.data);
      });
  };
};

export const deleteProfile = (id) => {
  return (dispatch) => {
    dispatch(membersActions.actionStart());
    return apiService
      .delete(`${membersPath}/${id}`)
      .then(() => {
        sessionStorage.removeItem("user");
        localStorage.removeItem("token");
        notifications.success("Successfully deleted profile");
        setTimeout(() => {
          window.location = "/register";
        }, 1000);
      })
      .catch((error) => {
        dispatch(membersActions.actionError(error?.response?.data));
        notifications.error(error?.response?.data);
      });
  };
};
