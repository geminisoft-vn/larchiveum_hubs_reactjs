import axios from "axios";
import Cookies from "js-cookie";
import { enqueueSnackbar } from "notistack";
import { toastNotifications } from "./common";

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
  if ((!response.config.url.toLowerCase().includes("auth"))) return response;
  if (response.config.method === "get") return response;
  if (response.status === 200 || response.status === 201) {
    if (response.config.method === "post") {
      toastNotifications("Create successfully!", "success", "bottom");
    } else if (
      response.config.method === "put" ||
      response.config.method === "patch"
    ) {
      if(!response.config.url.toLowerCase().includes("is-admin"))
      toastNotifications("Update successfully!", "success", "bottom");
    } else {
      toastNotifications("Delete successfully!", "success", "bottom");
    }
  }
  return response;
};

const onResponseError = error => {
  if (error?.response?.data?.all) {
    try {
      const errorData = JSON.parse(error.response.data.all);
      const errorMessage = errorData[0]?.message;
      toastNotifications(errorMessage || "Failed!", "error", "bottom");
    } catch (parseError) {
      toastNotifications(error.response.data.all || "Failed!", "error", "top", "center");
    }
  }
  return Promise.reject(error);
};


request.interceptors.request.use(onRequest, onRequestError);
request.interceptors.response.use(onResponse, onResponseError);

export default request;
