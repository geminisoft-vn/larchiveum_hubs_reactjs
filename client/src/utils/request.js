import axios from "axios";

import Cookies from "js-cookie";

import Snackbar, { SnackbarUtilsConfigurator } from "src/utils/snackbar";

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
  if (
    config.method.toLowerCase() !== "get" &&
    config.url.toLowerCase().includes("auth")
  ) {
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
  if (
    response.config.url.toLowerCase().includes("auth") &&
    response.config.method.toLowerCase() !== "get" &&
    response.status >= 200 &&
    response.status < 300
  ) {
    if (response.config.url.toLowerCase().includes("upload")) {
      Snackbar.success("Upload Successfully!", { variant: "success" });
      return response;
    }
    if (response.config.method.toLowerCase() === "post") {
      Snackbar.success("Create Successfully!", { variant: "success" });
    }
    if (response.config.method.toLowerCase() === "put") {
      Snackbar.success("Update Successfully!", { variant: "success" });
    }
    if (response.config.method.toLowerCase() === "delete") {
      Snackbar.success("Delete Successfully!", { variant: "success" });
    }
  }
  return response;
};

const onResponseError = error => {
  if (error.response) {
    if (error.response.data) {
      if (error.response.data.error) {
        if (error.response.data.error.message) {
          Snackbar.error(error.response.data.error.message);
        }
      }
    }
  }
  return Promise.reject(error);
};

request.interceptors.request.use(onRequest, onRequestError);
request.interceptors.response.use(onResponse, onResponseError);

export default request;
