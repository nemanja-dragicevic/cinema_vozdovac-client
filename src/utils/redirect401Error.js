import * as notifications from "../utils/notification";

export const redirect401Error = (error) => {
  if (error?.response?.status === 401) {
    notifications.error("Please login again to delete actor");
    sessionStorage.clear();
    localStorage.removeItem("token");
    window.location.href = "/";
    return;
  }
};
