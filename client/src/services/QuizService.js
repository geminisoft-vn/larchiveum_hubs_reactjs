import request from "src/utils/request";

class QuizService {
  static getOne(id) {
    return request.get(`/quizzes/${id}`).then((res) => res.data.data);
  }
  static create(data) {
    return request.post("/quizzes", data).then((res) => res.data.data);
  }
  static update(id, data) {
    return request.put(`/quizzes/${id}`, data).then((res) => res.data.data);
  }
  static delete(id) {
    return request.delete(`/quizzes/${id}`).then((res) => res.data.data);
  }
}

export default QuizService;
