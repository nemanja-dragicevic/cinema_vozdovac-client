import { actorsActions } from "../reducers/actors";
import { getActorsPath } from "../utils/endpoints";
import apiService from "./../utils/apiService";
import * as notifications from "../utils/notification";

export const getActors = () => {
  return (dispatch) => {
    dispatch(actorsActions.actionStart());
    return apiService
      .get(getActorsPath)
      .then((response) => {
        dispatch(actorsActions.fetchActors(response.data));
      })
      .catch((error) => {
        dispatch(actorsActions.actionError(error?.response?.data));
        notifications.error(error?.response?.data);
      });
  };
};
