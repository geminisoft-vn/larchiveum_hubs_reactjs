import { AxiosProgressEvent } from "axios";

import { IAxiosResponse } from "src/interfaces";
import request from "src/utilities/request";

class MediaService {
	static getListMedia(id: number): Promise<IAxiosResponse> {
		return request({
			method: "GET",
			url: `/v1/auth/media?exhibitionId=${id}`,
		});
	}

	static getAllByProjectId(id: string): Promise<IAxiosResponse> {
		return request({
			method: "GET",
			url: `/v1/auth/media?projectId=${id}`,
		});
	}

	static proxyMedia(objectId) {
		return request({
			method: "GET",
			url: `/v1/media/proxy/${objectId}`,
		});
	}

	static updateMediaMany(data) {
		return request({
			method: "PUT",
			url: `/v1/auth/media`,
			data: {
				medias: data,
			},
		});
	}

	static upload(
		file: File,
		onProgress: (percent: number) => void,
		abortController: AbortController | null,
	): Promise<IAxiosResponse> {
		const data = new FormData();
		data.append("file", file);
		return request.post("/v1/auth/media/upload", data, {
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
		});
	}
}

export default MediaService;
