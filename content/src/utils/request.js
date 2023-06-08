import axios from "axios";

const request = axios.create({
  baseURL: `${import.meta.env.VITE_API_ROOT}/v1`,
  timeout: 20000,
  maxContentLength: Infinity,
  maxBodyLength: Infinity,
  headers: {
    "Content-Type": "application/json",
  },
});

const onRequest = (config) => {
  return config;
};

const onRequestError = (error) => {
  return Promise.reject(error);
};

const onResponse = (response) => {
  return response;
};

const onResponseError = (error) => {
  return Promise.reject(error);
};

request.interceptors.request.use(onRequest, onRequestError);
request.interceptors.response.use(onResponse, onResponseError);

export default request;
