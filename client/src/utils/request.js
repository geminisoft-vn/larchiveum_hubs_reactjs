import axios from "axios";

import Cookies from "js-cookie";

const request = axios.create({
  baseURL: `${import.meta.env.VITE_API_ROOT}/v1`,
  timeout: 20000,
  maxContentLength: Infinity,
  maxBodyLength: Infinity,
  headers: {
    "Content-Type": "application/json"
  }
});

const onRequest = config => {
  if (config.url.toLowerCase().includes("auth")) {
    if (Cookies.get("__LARCHIVEUM__COOKIES")) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${Cookies.get("__LARCHIVEUM__COOKIES")}`
      };
    }
  }
  if (config.url.toLowerCase().includes("upload")) {
    config.headers = {
      ...config.headers,
      "Content-Type": "multipart/form-data"
    };
  }
  return config;
};

const onRequestError = error => {
  return Promise.reject(error);
};

const onResponse = response => {
  return response;
};

const onResponseError = error => {
  if (error.response) {
    if (error.response.data) {
      if (error.response.data.error) {
        if (error.response.data.error.message) {
          console.error(error.response.data.error.message);
        }
      }
    }
  }
  return Promise.reject(error);
};

request.interceptors.request.use(onRequest, onRequestError);
request.interceptors.response.use(onResponse, onResponseError);

export default request;
