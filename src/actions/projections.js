import apiService from "./../utils/apiService";
import * as notifications from "../utils/notification";
import { redirect401Error } from "../utils/redirect401Error";
import { projectionsActions } from "./../reducers/projections";
import { projectionsPath } from "./../utils/endpoints";

export const getProjectionsForMovieID = (date) => {
  return (dispatch) => {
    dispatch(projectionsActions.actionStart());
    return apiService
      .get(projectionsPath + "/" + date)
      .then((response) => {
        dispatch(projectionsActions.fetchProjections(response.data));
      })
      .catch((error) => {
        if (error?.response?.status === 401) redirect401Error(error);
        dispatch(projectionsActions.actionError(error?.response?.data));
        notifications.error(error?.response?.data);
      });
  };
};

export const setProjection = (id) => {
  return (dispatch) => {
    dispatch(projectionsActions.setProjection(id));
  };
};

export const getTimeForHallID = (date, hallID) => {
  console.log(date, hallID);
  return (dispatch) => {
    dispatch(projectionsActions.actionStart());
    return apiService
      .get(`${projectionsPath}/${date}/${hallID}`)
      .then((response) => {
        dispatch(projectionsActions.fetchTimes(response.data));
      })
      .catch((error) => {
        if (error.response.status === 401) {
          redirect401Error(error);
        }
        dispatch(projectionsActions.actionError(error?.response?.data));
        notifications.error();
      });
  };
};
