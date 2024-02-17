import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
});

const handleErrors = async (error) => {
  throw error;
};

const apiService = {
  get(url) {
    return axiosInstance.get(url).catch(handleErrors);
  },

  post(url, body) {
    return axiosInstance.post(url, body).catch(handleErrors);
  },

  put(url, body) {
    return axiosInstance.put(url, body).catch(handleErrors);
  },

  delete(url) {
    return axiosInstance.delete(url).catch(handleErrors);
  },
};

export default apiService;
