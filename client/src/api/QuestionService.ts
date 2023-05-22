/* eslint-disable no-unused-vars */
import { IAxiosResponse, IParams, IQuestion } from "src/interfaces";
import request from "src/utilities/request";

class QuestionService {
	static getAll(params: IParams) {
		return request.get("/auth/questions", { params });
	}

	static getOne(id: number): Promise<IAxiosResponse<IQuestion>> {
		return request.get(`/auth/questions/${id}`);
	}

	static create(data) {
		return request.post("/auth/questions", data);
	}

	static update(id, data) {
		return request.put(`/auth/questions/${id}`, data);
	}

	static chooseCorrectAnswer(id, answerId) {
		return request.post(`/auth/questions/${id}/choose-correct-answer`, {
			answerId,
		});
	}

	static submitAnswers(id, answerIds) {
		return request.post(`/auth/questions/${id}/submit-answers`, {
			answerId: answerIds,
		});
	}

	static delete(id) {
		return request.delete(`/auth/questions/${id}`);
	}
}

export default QuestionService;