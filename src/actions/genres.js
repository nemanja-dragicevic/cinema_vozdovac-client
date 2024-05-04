import apiService from "../utils/apiService";
import * as notifications from "../utils/notification";
import { redirect401Error } from "../utils/redirect401Error";
import { genresPath } from "../utils/endpoints";
import { genresActions } from "./../reducers/genres";

export const getGenres = () => {
  return (dispatch) => {
    dispatch(genresActions.actionStart());
    return apiService
      .get(genresPath)
      .then((response) => {
        dispatch(genresActions.fetchGenres(response.data));
      })
      .catch((error) => {
        if (error.response.status === 401) {
          redirect401Error(error);
        }
        dispatch(genresActions.actionError(error?.response?.data));
        notifications.error("Error while fetching genres");
      });
  };
};
