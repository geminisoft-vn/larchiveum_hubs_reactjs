import axios from "axios";
import constants from "./../utils/constants";
import LocalStorage from "./../utils/store";

const request = axios.create({
  baseURL: constants.API_URL_ROOT,
  timeout: constants.REQUEST_TIMEOUT
});

request.interceptors.request.use(
  config => {
    const token = LocalStorage.getAccessToken();
    if (token && config.headers) {
      config.headers["access_token"] = token;
      config.headers["Accept"] = "application/json";
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

request.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);

export default request;
