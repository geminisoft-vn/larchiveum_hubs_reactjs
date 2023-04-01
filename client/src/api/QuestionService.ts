/* eslint-disable no-unused-vars */
import { IParams } from "src/interfaces";
import request from "src/utilities/request";

class QuestionService {
	static getAll(params: IParams) {
		return request.get("/v1/auth/questions", { params });
	}

	static getOne(id: number) {
		return request.get(`/v1/auth/questions/${id}`);
	}

	static create(data) {
		return request.post("/v1/auth/questions", data);
	}

	static update(id, data) {
		return request.put(`/v1/auth/questions/${id}`, data);
	}

	static chooseCorrectAnswer(id, answerId) {
		return request.post(`/v1/auth/questions/${id}/choose-correct-answer`, {
			answerId,
		});
	}

	static submitAnswers(id, answerIds) {
		return request.post(`/v1/auth/questions/${id}/submit-answers`, {
			answerId: answerIds,
		});
	}

	static delete(id) {
		return request.delete(`/v1/auth/questions/${id}`);
	}
}

export default QuestionService;
