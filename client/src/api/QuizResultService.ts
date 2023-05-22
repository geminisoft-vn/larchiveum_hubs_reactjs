/* eslint-disable no-unused-vars */
import request from "src/utilities/request";

class QuizResultService {
	static getAll(params) {
		return request.get("/auth/quiz-results", { params });
	}

	static getOne(id) {
		return request.get(`/auth/quiz-results/${id}`);
	}

	static create(data) {
		return request.post("/auth/quiz-results", data);
	}

	static update(id, data) {
		return request.put(`/auth/quiz-results/${id}`, data);
	}

	static delete(id) {
		return request.delete(`/auth/quiz-results/${id}`);
	}

	static submitAnswers(id, data) {
		return request.post(`/auth/quiz-results/${id}/submit-answers`, data);
	}

	static getResults(id) {
		return request.get(`/auth/quiz-results/${id}/results`);
	}
}

export default QuizResultService;