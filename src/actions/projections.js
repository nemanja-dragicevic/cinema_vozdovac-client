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

export const getTimeForHallAndDate = (date, hallID) => {
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

export const getTimeForHallID = (hallID, startDate, endDate) => {
  const params = {
    hallID: hallID,
    startDate: startDate,
    endDate: endDate,
  };
  return (dispatch) => {
    dispatch(projectionsActions.actionStart());
    return (
      apiService
        // .get(`${projectionsPath}/${hallID}`)
        // .get(`${projectionsPath}/get-projections`, {
        //   params: params,
        // })
        .get(`${projectionsPath}/get-projections`, params)
        .then((response) => {
          dispatch(projectionsActions.fetchTimes(response.data));
        })
        .catch((error) => {
          if (error.response.status === 401) {
            redirect401Error(error);
          }
          dispatch(projectionsActions.actionError(error?.response?.data));
          notifications.error();
        })
    );
  };
};

export const deleteProjection = (id) => {
  return (dispatch) => {
    dispatch(projectionsActions.actionStart());
    return apiService
      .delete(projectionsPath + "/" + id)
      .then((response) => {
        dispatch(projectionsActions.deleteProjection(id));
        notifications.success(response.data);
      })
      .catch((error) => {
        if (error?.response?.status === 401) redirect401Error(error);
        dispatch(projectionsActions.actionError(error?.response?.data));
        notifications.error(error?.response?.data);
      });
  };
};

export const editProjection = (data) => {
  return (dispatch) => {
    dispatch(projectionsActions.actionStart());
    return apiService
      .put(projectionsPath + "/" + data.id, data)
      .then((response) => {
        dispatch(projectionsActions.editProjection(data));
        notifications.success("Successfully edited projection");
      })
      .catch((error) => {
        if (error?.response?.status === 401) redirect401Error(error);
        dispatch(projectionsActions.actionError(error?.response?.data));
        notifications.error(error?.response?.data);
      });
  };
};

export const getProjectionsForDateAndMovie = (date, id) => {
  return (dispatch) => {
    dispatch(projectionsActions.actionStart());
    return apiService
      .get(projectionsPath + `?date=${date}&id=${id}`)
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
