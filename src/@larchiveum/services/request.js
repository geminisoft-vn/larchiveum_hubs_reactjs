import axios from "axios";
import { API_ROOT } from "../utils/constants";

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
	const token = window.localStorage.getItem('__larchiveum_access_token');
	return token;
};

const onRequest = (config) => {
	const accessToken = getAccessToken();
	if (accessToken.length) {
		config.headers.access_token = accessToken;
	}
	return config;
};

const onRequestError = (error) => {
	store.dispatch(stopLoading());
	return Promise.reject(error);
};

const onResponse = (response) => {
	store.dispatch(stopLoading());
	return response.data;
};

const onResponseError = (error) => {
	if (error.response) {
		console.log(error.response.data);
		console.log(error.response.status);
		console.log(error.response.headers);
	} else if (error.request) {
		console.log(error.request);
	} else {
		console.log("Error", error.message);
	}
	store.dispatch(stopLoading());
	return Promise.reject(error);
};

request.interceptors.request.use(onRequest, onRequestError);
request.interceptors.response.use(onResponse, onResponseError);

export default request;
