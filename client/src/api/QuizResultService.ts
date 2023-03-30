/* eslint-disable no-unused-vars */
import request from "src/utilities/axiosInstance";

class QuizResultService {
	static getAll(params) {
		return request
			.get("/v1/auth/quiz-results", { params })
			.then((res) => res.data);
	}

	static getOne(id) {
		return request.get(`/v1/auth/quiz-results/${id}`).then((res) => res.data);
	}

	static create(data) {
		return request.post("/v1/auth/quiz-results", data).then((res) => res.data);
	}

	static update(id, data) {
		return request
			.put(`/v1/auth/quiz-results/${id}`, data)
			.then((res) => res.data);
	}

	static delete(id) {
		return request
			.delete(`/v1/auth/quiz-results/${id}`)
			.then((res) => res.data);
	}

	static submitAnswers(id, data) {
		return request
			.post(`/v1/auth/quiz-results/${id}/submit-answers`, data)
			.then((res) => res.data);
	}

	static getResults(id) {
		return request
			.get(`/v1/auth/quiz-results/${id}/results`)
			.then((res) => res.data);
	}
}

export default QuizResultService;
