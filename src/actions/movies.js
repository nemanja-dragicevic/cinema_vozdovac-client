import { moviesActions } from "../reducers/movies";
import { moviesPath, moviesPathID } from "../utils/endpoints";
import apiService from "./../utils/apiService";
import * as notifications from "../utils/notification";

export const getMovies = () => {
  return (dispatch) => {
    dispatch(moviesActions.actionStart());
    return apiService
      .get(moviesPath)
      .then((response) => {
        dispatch(moviesActions.fetchMovies(response.data));
      })
      .catch((error) => {
        if (error.response.status === 401) {
          localStorage.removeItem("token");
        }
        dispatch(moviesActions.actionError(error?.response?.data));
        notifications.error();
      });
  };
};

export const deleteMovie = (id) => {
  return (dispatch) => {
    dispatch(moviesActions.actionStart());
    return apiService
      .delete(moviesPathID(id))
      .then(() => {
        dispatch(moviesActions.deleteMovie(id));
        notifications.success("Successfully deleted movie");
      })
      .catch((error) => {
        if (error.response.status === 401) {
          localStorage.removeItem("token");
        }
        dispatch(moviesActions.actionError(error?.response?.data));
        notifications.error("Error while deleting movie");
      });
  };
};
