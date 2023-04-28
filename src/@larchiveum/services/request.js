import axios from "axios";
import { API_ROOT } from "../utils/constants";

const request = axios.create({
  baseURL: API_ROOT,
  timeout: 20000,
  maxContentLength: Infinity,
  maxBodyLength: Infinity,
  headers: {
    "Content-Type": "application/json"
  }
});

const onRequest = config => {
  return config;
};

const onRequestError = error => {
  return Promise.reject(error);
};

const onResponse = response => {
  return response.data;
};

const onResponseError = error => {
  if (error.response) {
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  } else if (error.request) {
    console.log(error.request);
  } else {
    console.log("Error", error.message);
  }
  return Promise.reject(error);
};

request.interceptors.request.use(onRequest, onRequestError);
request.interceptors.response.use(onResponse, onResponseError);

export default request;
