import { hallActions } from "../reducers/hall";
import apiService from "../utils/apiService";
import * as notifications from "../utils/notification";
import { hallsPath } from "../utils/endpoints";

export const getHalls = () => {
  return (dispatch) => {
    dispatch(hallActions.actionStart());
    return apiService
      .get(hallsPath)
      .then((response) => {
        dispatch(hallActions.fetchHalls(response.data));
      })
      .catch((error) => {
        if (error.response.status === 401) {
          localStorage.removeItem("token");
        }
        dispatch(hallActions.actionError(error?.response?.data));
        notifications.error();
      });
  };
};
