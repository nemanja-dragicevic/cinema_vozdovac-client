import * as notifications from "../utils/notification";
import apiService from "../utils/apiService";
import { movieRolesPath } from "../utils/endpoints";
import { rolesActions } from "../reducers/roles";

export const getRoles = (movieID) => {
  return (dispatch) => {
    dispatch(rolesActions.actionStart());
    return apiService
      .get(movieRolesPath(movieID))
      .then((response) => {
        dispatch(rolesActions.fetchRoles(response.data));
      })
      .catch((error) => {
        dispatch(rolesActions.actionError(error?.response?.data));
        notifications.error();
      });
  };
};
