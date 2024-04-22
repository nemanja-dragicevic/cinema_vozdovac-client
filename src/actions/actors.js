import { actorsActions } from "../reducers/actors";
import { getActorsPath, actorWithId, actorsPath } from "../utils/endpoints";
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

export const saveActor = (data) => {
  return (dispatch) => {
    dispatch(actorsActions.actionStart());
    return apiService
      .post(actorsPath, data)
      .then((response) => {
        dispatch(actorsActions.saveActor(response.data));
        notifications.success("Actor saved successfully");
      })
      .catch((error) => {
        dispatch(actorsActions.actionError(error?.response?.data));
        notifications.error(error?.response?.data);
      });
  };
};

export const deleteActor = (id) => {
  return (dispatch) => {
    dispatch(actorsActions.actionStart());
    return apiService
      .delete(actorWithId(id))
      .then(() => {
        dispatch(actorsActions.deleteActor(id));
        notifications.success("Actor deleted successfully");
      })
      .catch((error) => {
        dispatch(actorsActions.actionError(error?.response?.data));
        notifications.error(error?.response?.data);
      });
  };
};
