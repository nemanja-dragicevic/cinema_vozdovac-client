import { genresActions } from "./../reducers/genres";
import { genresPath } from "../utils/endpoints";
import apiService from "../utils/apiService";
import * as notifications from "../utils/notification";
import { redirect401Error } from "../utils/redirect401Error";

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

export const addGenre = (genre) => {
  return (dispatch) => {
    dispatch(genresActions.actionStart());
    return apiService
      .post(genresPath, genre)
      .then((response) => {
        dispatch(genresActions.saveGenre(response.data));
        notifications.success("Genre added successfully");
      })
      .catch((error) => {
        if (error.response.status === 401) {
          redirect401Error(error);
        }
        dispatch(genresActions.actionError(error?.response?.data));
        notifications.error("Error while adding genre");
      });
  };
};

export const updateGenre = (data) => {
  return (dispatch) => {
    dispatch(genresActions.actionStart());
    return apiService
      .put(genresPath, data)
      .then((response) => {
        dispatch(genresActions.updateGenre(response.data));
        notifications.success("Genre updated successfully");
      })
      .catch((error) => {
        // console.log(error);
        if (error.response.status === 401) {
          redirect401Error(error);
        }
        dispatch(genresActions.actionError(error?.response?.data));
        notifications.error("Error while updating genre");
      });
  };
}

export const deleteGenre = (id) => {
  return (dispatch) => {
    dispatch(genresActions.actionStart());
    return apiService
      .delete(`${genresPath}/${id}`)
      .then(() => {
        dispatch(genresActions.deleteGenre(id));
        notifications.success("Genre deleted successfully");
      })
      .catch((error) => {
        if (error.response.status === 401) {
          redirect401Error(error);
        }
        dispatch(genresActions.actionError(error?.response?.data));
        notifications.error("Error while deleting genre");
      });
  };
}
