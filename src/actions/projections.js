import apiService from "./../utils/apiService";
import * as notifications from "../utils/notification";
import { redirect401Error } from "../utils/redirect401Error";
import { projectionsActions } from "./../reducers/projections";
import { projectionsPath } from "./../utils/endpoints";

export const getProjectionsForMovieID = (movieID) => {
  return (dispatch) => {
    dispatch(projectionsActions.actionStart());
    return apiService
      .get(projectionsPath + "/" + movieID)
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
