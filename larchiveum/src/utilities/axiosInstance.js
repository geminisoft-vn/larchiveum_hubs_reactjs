import axios from "axios";

import { API_ROOT } from "./constants";
import Store from "./store";

const axiosInstance = axios.create({
  baseURL: API_ROOT,
  timeout: 20000,
  maxContentLength: Infinity,
  maxBodyLength: Infinity,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const user = Store.getUser();
    if (user) {
      config.headers["access_token"] = user.token;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
