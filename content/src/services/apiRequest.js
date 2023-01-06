import axios from "axios";
import Store from "../utils/store";
import { API_ROOT } from "./../utils/constants";

const service = axios.create({
  baseURL: API_ROOT,
  timeout: 15000
});

service.interceptors.request.use(
  config => {
    const token = Store.getAccessToken();
    if (token) {
      config.headers["access_token"] = token;
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
    if(error.response?.data?.result === 'fail' && (error.response?.data?.error === 'invalid_token' || error.response?.data?.error === 'verify_token_fail')){
      //window.location.href = '/permission-denied';
    }
    return Promise.reject(error);
  }
);

export default service;
