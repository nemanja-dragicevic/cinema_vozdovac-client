import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
});

const handleErrors = async (error) => {
  throw error;
};

const apiService = {
  get(url) {
    return axiosInstance
      .get(url, { headers: getHeaders() })
      .catch(handleErrors);
  },

  post(url, body) {
    return axiosInstance
      .post(url, body, { headers: getHeaders() })
      .catch(handleErrors);
  },

  put(url, body) {
    return axiosInstance
      .put(url, body, { headers: getHeaders() })
      .catch(handleErrors);
  },

  delete(url) {
    return axiosInstance
      .delete(url, { headers: getHeaders() })
      .catch(handleErrors);
  },
};

function getHeaders() {
  const jwtToken = localStorage.getItem("token");

  if (!jwtToken) {
    return null;
  }
  const headers = {
    "Content-Type": "application/json",
    ...(jwtToken !== undefined ? { Authorization: `Bearer ${jwtToken}` } : {}),
  };

  return headers;
}

export default apiService;
