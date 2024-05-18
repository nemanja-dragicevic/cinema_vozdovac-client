import { moviesActions } from "../reducers/movies";
import {
  allMovies,
  moviesApi,
  moviesPath,
  moviesPathID,
} from "../utils/endpoints";
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

export const getMoviesInfo = () => {
  return (dispatch) => {
    dispatch(moviesActions.actionStart());
    return apiService
      .get(allMovies)
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

export const getMovie = (id) => {
  return (dispatch) => {
    dispatch(moviesActions.actionStart());
    return apiService
      .get(moviesPathID(id))
      .then((response) => {
        dispatch(moviesActions.fetchMovie(response.data));
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

export const editMovie = (data, images) => {
  const formData = new FormData();

  formData.append("movie", JSON.stringify(data));
  if (images.smallPicture !== null) {
    formData.append("smallPicture", images.smallPicture);
    // data.smallPicture = null;
  }
  if (images.bigPicture !== null) {
    formData.append("bigPicture", images.bigPicture);
    // data.bigPicture = null;
  }

  return (dispatch) => {
    dispatch(moviesActions.actionStart());
    return apiService
      .putFormData(moviesApi, formData)
      .then((response) => {
        dispatch(moviesActions.editMovie(response.data));
        notifications.success("Successfully edited movie");
      })
      .catch((error) => {
        if (error.response.status === 401) {
          localStorage.removeItem("token");
        }
        dispatch(moviesActions.actionError(error?.response?.data));
        notifications.error("Error while editing movie");
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
