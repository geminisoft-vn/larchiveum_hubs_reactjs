/* eslint-disable no-unused-vars */
import request from "src/utilities/request";

class QuizService {
	static getAll(params) {
		return request.get("/v1/auth/quizs", { params });
	}

	static getOne(id) {
		return request.get(`/v1/auth/quizs/${id}`);
	}

	static create(data) {
		return request.post("/v1/auth/quizs", data);
	}

	static update(id, data) {
		return request.put(`/v1/auth/quizs/${id}`, data);
	}

	static delete(id) {
		return request.delete(`/v1/auth/quizs/${id}`);
	}
}

export default QuizService;
