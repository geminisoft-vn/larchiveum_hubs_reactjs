/* eslint-disable no-unused-vars */
import request from "src/utilities/request";

class AnswerService {
	static getAll(params) {
		return request.get("/auth/answers", { params });
	}

	static getOne(id) {
		return request.get(`/auth/answers/${id}`);
	}

	static create(data) {
		return request.post("/auth/answers", data);
	}

	static update(id, data) {
		return request.put(`/auth/answers/${id}`, data);
	}

	static delete(id) {
		return request.delete(`/auth/answers/${id}`);
	}
}

export default AnswerService;