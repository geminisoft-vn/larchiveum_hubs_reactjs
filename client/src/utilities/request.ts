import axios, {
	AxiosError,
	AxiosResponse,
	InternalAxiosRequestConfig,
} from "axios";

import store from "src/app/store";
import { startLoading, stopLoading } from "src/features/loader/LoaderSlice";

import { API_ROOT } from "./constants";

const request = axios.create({
	baseURL: API_ROOT,
	timeout: 20000,
	maxContentLength: Infinity,
	maxBodyLength: Infinity,
	headers: {
		"Content-Type": "application/json",
	},
});

const getAccessToken = () => {
	const state = store.getState();
	const { token } = state.user.authentication;
	if (token) return token;
	return "";
};

const onRequest = (
	config: InternalAxiosRequestConfig,
): InternalAxiosRequestConfig => {
	store.dispatch(startLoading());

	const accessToken = getAccessToken();
	if (accessToken.length) {
		config.headers.access_token = accessToken;
	}
	return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
	store.dispatch(stopLoading());
	return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
	store.dispatch(stopLoading());
	return response.data;
};

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
	if (error.response) {
		// The request was made and the server responded with a status code
		// that falls out of the range of 2xx
		console.log(error.response.data);
		console.log(error.response.status);
		console.log(error.response.headers);
	} else if (error.request) {
		// The request was made but no response was received
		// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
		// http.ClientRequest in node.js
		console.log(error.request);
	} else {
		// Something happened in setting up the request that triggered an Error
		console.log("Error", error.message);
	}
	store.dispatch(stopLoading());
	return Promise.reject(error);
};

request.interceptors.request.use(onRequest, onRequestError);
request.interceptors.response.use(onResponse, onResponseError);

export default request;
