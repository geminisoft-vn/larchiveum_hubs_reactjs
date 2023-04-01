/* eslint-disable no-unused-vars */
import request from "src/utilities/request";

class DocumentService {
	static getAll(params) {
		return request.get("/v1/auth/documents", { params });
	}

	static getOne(id) {
		return request.get(`/v1/auth/documents/${id}`);
	}

	static create(data) {
		return request.post("/v1/auth/documents", data);
	}

	static update(id, data) {
		return request.put(`/v1/auth/documents/${id}`, data);
	}

	static delete(id) {
		return request.delete(`/v1/auth/documents/${id}`);
	}
}

export default DocumentService;
