import axios from "axios";
import Cookies from "js-cookie";

import store from "src/app/store";
import { startLoading, stopLoading } from "src/features/loader/LoaderSlice";

import { API_ROOT } from "./constants";

const axiosInstance = axios.create({
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

axiosInstance.interceptors.request.use(
	(config) => {
		store.dispatch(startLoading());

		const accessToken = getAccessToken();
		if (accessToken.length) {
			config.headers.access_token = accessToken;
		}
		return config;
	},
	(error) => {
		Promise.reject(error);
	},
);

axiosInstance.interceptors.response.use(
	(response) => {
		store.dispatch(stopLoading());
		return response;
	},
	(error) => Promise.reject(error),
);

export default axiosInstance;
