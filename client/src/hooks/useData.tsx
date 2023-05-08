import useSWR from "swr";

import request from "src/utilities/request";

const fetcher = (method, params, callback) => (url) => {
	return request({
		method,
		url,
		params,
	}).then((res) => {
		const { data, pages } = res.data;
		if (callback) callback(data, pages);
		return data;
	});
};

const useData = (endpoint, method, params, callback) => {
	return useSWR(endpoint, fetcher(method, params, callback));
};

export default useData;
