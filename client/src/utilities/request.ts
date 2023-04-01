import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

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
	if (Cookies.get("__LARCHIVEUM__USER") && Cookies.get("__LARCHIVEUM__USER") !== "") {
		const str = Cookies.get("__LARCHIVEUM__USER");
		const user = JSON.parse(str || "{}");
		if (user) {
			if (user.token) return user.token;
		}
	}
	return "";
};

const onRequest = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
	store.dispatch(startLoading());

	const accessToken = getAccessToken();
	if (accessToken.length) {
		config.headers.access_token = accessToken;
	}
	return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
	console.error("🚀 ---------------------------------------------------------🚀");
	console.error("🚀 ~ file: request.ts:43 ~ onRequestError ~ error:", error);
	console.error("🚀 ---------------------------------------------------------🚀");
	store.dispatch(startLoading());
	return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
	store.dispatch(stopLoading());
	return response.data;
};

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
	console.error("🚀 ----------------------------------------------------------🚀");
	console.error("🚀 ~ file: request.ts:57 ~ onResponseError ~ error:", error);
	console.error("🚀 ----------------------------------------------------------🚀");
	store.dispatch(startLoading());
	return Promise.reject(error);
};

request.interceptors.request.use(onRequest, onRequestError);
request.interceptors.response.use(onResponse, onResponseError);

export default request;
