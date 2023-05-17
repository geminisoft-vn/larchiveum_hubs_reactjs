/* eslint-disable no-unused-vars */
import { IAxiosResponse, IDocument } from "src/interfaces";
import request from "src/utilities/request";

class DocumentService {
	static getAll(params) {
		return request.get("/auth/documents", { params });
	}

	static getOne(id): Promise<IAxiosResponse<IDocument>> {
		return request.get(`/auth/documents/${id}`).then((res) => res.data);
	}

	static create(data) {
		return request.post("/auth/documents", data).then((res) => res.data);
	}

	static update(id, data) {
		return request.put(`/auth/documents/${id}`, data).then((res) => res.data);
	}

	static delete(id) {
		return request.delete(`/auth/documents/${id}`).then((res) => res.data);
	}
}

export default DocumentService;
