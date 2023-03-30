/* eslint-disable no-unused-vars */
import request from "src/utilities/axiosInstance";

class DocumentService {
	static getAll(params) {
		return request
			.get("/v1/auth/documents", { params })
			.then((res) => res.data);
	}

	static getOne(id) {
		return request.get(`/v1/auth/documents/${id}`).then((res) => res.data);
	}

	static create(data) {
		return request.post("/v1/auth/documents", data).then((res) => res.data);
	}

	static update(id, data) {
		return request
			.put(`/v1/auth/documents/${id}`, data)
			.then((res) => res.data);
	}

	static delete(id) {
		return request.delete(`/v1/auth/documents/${id}`).then((res) => res.data);
	}
}

export default DocumentService;
