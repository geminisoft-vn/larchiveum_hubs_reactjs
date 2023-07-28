import axios from "axios";
import Cookies from "js-cookie";
import { enqueueSnackbar } from "notistack";

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
  if ((!response.config.url.toLowerCase().includes("auth")) || (response.config.url.toLowerCase().includes("register"))) return response;
  if (response.config.method === "get") return response;
  if (response.status === 200 || response.status === 201) {
    if (response.config.method === "post") {
      enqueueSnackbar("Create successfully!", {
        variant: "success",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "left"
        }
      });
    } else if (
      response.config.method === "put" ||
      response.config.method === "patch"
    ) {
      enqueueSnackbar("Update successfully!", {
        variant: "success",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "left"
        }
      });
    } else {
      enqueueSnackbar("Delete successfully!", {
        variant: "success",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "left"
        }
      });
    }
  }
  return response;
};

const onResponseError = error => {
  const invalid_length = JSON.parse(error?.response?.data?.all)[0].message;
  enqueueSnackbar(invalid_length || "Failed!", {
    variant: "error",
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "left"
    }
  });
  return Promise.reject(error);
};

request.interceptors.request.use(onRequest, onRequestError);
request.interceptors.response.use(onResponse, onResponseError);

export default request;
