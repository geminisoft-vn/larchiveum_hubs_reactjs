/* eslint-disable no-unused-vars */
import request from "src/utilities/request";

class AnswerService {
	static getAll(params) {
		return request.get("/v1/auth/answers", { params });
	}

	static getOne(id) {
		return request.get(`/v1/auth/answers/${id}`);
	}

	static create(data) {
		return request.post("/v1/auth/answers", data);
	}

	static update(id, data) {
		return request.put(`/v1/auth/answers/${id}`, data);
	}

	static delete(id) {
		return request.delete(`/v1/auth/answers/${id}`);
	}
}

export default AnswerService;
