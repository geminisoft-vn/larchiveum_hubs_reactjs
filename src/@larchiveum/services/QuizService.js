import request from "./request";

class QuizService {
  static getAll(params) {
    return request({
      method: "GET",
      url: "/v1/quizzes",
      params
    });
  }

  static getOne(id) {
    return request.get(`/v1/quizzes/${id}`);
  }

  static create(data) {
    return request.post("/v1/auth/quizzes", data);
  }

  static update(id, data) {
    return request.put(`/v1/auth/quizzes/${id}`, data);
  }

  static delete(id) {
    return request.delete(`/v1/auth/quizzes/${id}`);
  }
}

export default QuizService;
