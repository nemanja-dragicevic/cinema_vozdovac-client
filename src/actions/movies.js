import { moviesActions } from "../reducers/movies";
import { moviesPath } from "../utils/endpoints";
import apiService from "./../utils/apiService";

export const getMovies = () => {
  return (dispatch) => {
    dispatch(moviesActions.actionStart());
    return apiService
      .get(moviesPath)
      .then((response) => {
        dispatch(moviesActions.fetchMovies(response.data));
      })
      .catch((error) => {
        dispatch(moviesActions.actionError(error?.response?.data));
      });
  };
};
