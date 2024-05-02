import { hallActions } from "../reducers/hall";
import apiService from "../utils/apiService";
import * as notifications from "../utils/notification";
import { hallsPath } from "../utils/endpoints";
import { redirect401Error } from "../utils/redirect401Error";

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
          redirect401Error(error);
        }
        dispatch(hallActions.actionError(error?.response?.data));
        notifications.error();
      });
  };
};

export const saveHall = (data) => {
  return (dispatch) => {
    dispatch(hallActions.actionStart());
    return apiService
      .post(hallsPath, data)
      .then((response) => {
        dispatch(hallActions.addHall(response.data));
        notifications.success("Hall added successfully!");
      })
      .catch((error) => {
        if (error.response.status === 401) {
          redirect401Error(error);
        }
        dispatch(hallActions.actionError(error?.response?.data));
        notifications.error();
      });
  };
};

export const updateHall = (data) => {
  return (dispatch) => {
    dispatch(hallActions.actionStart());
    return apiService
      .put(hallsPath, data)
      .then((response) => {
        dispatch(hallActions.updateHall(response.data));
        notifications.success("Hall updated successfully!");
      })
      .catch((error) => {
        if (error.response.status === 401) {
          redirect401Error(error);
        }
        dispatch(hallActions.actionError(error?.response?.data));
        notifications.error();
      });
  };
};

export const deleteHall = (hallID) => {
  return (dispatch) => {
    dispatch(hallActions.actionStart());
    return apiService
      .delete(`${hallsPath}/${hallID}`)
      .then(() => {
        dispatch(hallActions.deleteHall(hallID));
        notifications.success("Hall deleted successfully!");
      })
      .catch((error) => {
        if (error.response.status === 401) {
          redirect401Error(error);
        }
        dispatch(hallActions.actionError(error?.response?.data));
        notifications.error();
      });
  };
};
