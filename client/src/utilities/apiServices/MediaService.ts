import { AxiosProgressEvent } from "axios";

import request from "../axiosInstance";
import { API_ROOT } from "../constants";
import Store from "../store";

class MediaService {
	static getListMedia(id) {
		return fetch(`${API_ROOT}/v1/auth/medias?exhibitionId=${id}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				access_token: Store.getUser()?.token,
			},
		})
			.then((res) => res.json())
			.catch((error) => {
				console.log(error);
			});
	}

	static proxyMedia(objectId) {
		return fetch(`${API_ROOT}/v1/medias/proxy/${objectId}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				access_token: "",
			},
		})
			.then((res) => res.json())
			.catch((error) => {
				console.log(error);
			});
	}

	static updateMediaMany(data) {
		return fetch(`${API_ROOT}/v1/auth/medias`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				access_token: Store.getUser()?.token,
			},
			body: JSON.stringify({
				medias: data,
			}),
		})
			.then((res) => res.json())
			.catch((error) => {
				console.log(error);
			});
	}

	static upload(
		file: File,
		onProgress: (percent: number) => void,
		abortController: AbortController | null,
	) {
		const data = new FormData();
		data.append("file", file);
		return request
			.post("/v1/auth/medias/upload", data, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
				onUploadProgress: (progressEvent: AxiosProgressEvent) => {
					if (progressEvent?.loaded && progressEvent?.total) {
						const percent = Math.round(
							(progressEvent.loaded * 100) / progressEvent.total,
						);
						if (onProgress) onProgress(percent);
					}
				},
				signal: abortController?.signal,
			})
			.then((res) => res.data);
	}
}

export default MediaService;
