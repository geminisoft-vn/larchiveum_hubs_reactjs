/* eslint-disable no-unused-vars */
import { IAxiosResponse, IQuiz } from "src/interfaces";
import request from "src/utilities/request";

class QuizService {
	static getAll(params) {
		return request.get("/quizzes");
	}

	static getOne(id): Promise<IAxiosResponse<IQuiz>> {
		return request.get(`/auth/quizzes/${id}`).then((res) => res.data);
	}

	static create(data) {
		return request.post("/auth/quizzes", data).then((res) => res.data);
	}

	static update(id, data): Promise<IAxiosResponse<IQuiz>> {
		return request.put(`/auth/quizzes/${id}`, data).then((res) => res.data);
	}

	static delete(id): Promise<IAxiosResponse<IQuiz>> {
		return request.delete(`/auth/quizzes/${id}`).then((res) => res.data);
	}
}

export default QuizService;