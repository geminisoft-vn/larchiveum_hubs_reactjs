import axios from "axios";
import Store from "../store";
import { API_ROOT } from "../constants";

const service = axios.create({
  baseURL: API_ROOT,
  timeout: 20000,
  maxContentLength: Infinity,
  maxBodyLength: Infinity
});

service.interceptors.request.use(
  config => {
    const user = Store.getUser();
    if (user) {
      config.headers["access_token"] = user.token;
    }
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

service.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);

export default service;