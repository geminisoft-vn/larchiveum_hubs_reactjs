/* eslint-disable no-unused-vars */
import { IAxiosResponse, IQuiz } from "src/interfaces";
import request from "src/utilities/request";

class QuizService {
	static getAll(params) {
		return request.get("/v1/auth/quizzes", { params });
	}

	static getOne(id): Promise<IAxiosResponse<IQuiz>> {
		return request.get(`/v1/auth/quizzes/${id}`);
	}

	static create(data) {
		return request.post("/v1/auth/quizzes", data);
	}

	static update(id, data): Promise<IAxiosResponse<IQuiz>> {
		return request.put(`/v1/auth/quizzes/${id}`, data);
	}

	static delete(id) {
		return request.delete(`/v1/auth/quizzes/${id}`);
	}
}

export default QuizService;
