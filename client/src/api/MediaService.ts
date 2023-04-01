import { AxiosProgressEvent } from "axios";

import request from "src/utilities/request";

class MediaService {
	static getListMedia(id) {
		return request({
			method: "GET",
			url: `/v1/auth/medias?exhibitionId=${id}`,
		});
	}

	static proxyMedia(objectId) {
		return request({
			method: "GET",
			url: `/v1/medias/proxy/${objectId}`,
		});
	}

	static updateMediaMany(data) {
		return request({
			method: "PUT",
			url: `/v1/auth/medias`,
			data: {
				medias: data,
			},
		});
	}

	static upload(file: File, onProgress: (percent: number) => void, abortController: AbortController | null) {
		const data = new FormData();
		data.append("file", file);
		return request.post("/v1/auth/medias/upload", data, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
			onUploadProgress: (progressEvent: AxiosProgressEvent) => {
				if (progressEvent?.loaded && progressEvent?.total) {
					const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
					if (onProgress) onProgress(percent);
				}
			},
			signal: abortController?.signal,
		});
	}
}

export default MediaService;
