/* eslint-disable no-unused-vars */
import request from "./apiRequest";

class QuizResultService {
  static getAll(params) {
    return request.get("/v1/quiz-results", { params: params }).then(res => {
      return res.data;
    });
  }

  static getOne(id) {
    return request.get("/v1/quiz-results/" + id).then(res => {
      return res.data;
    });
  }

  static create(data) {
    return request.post("/v1/quiz-results", data).then(res => {
      return res.data;
    });
  }

  static update(id, data) {
    return request.put("/v1/quiz-results/" + id, data).then(res => {
      return res.data;
    });
  }

  static delete(id) {
    return request.delete("/v1/quiz-results/" + id).then(res => {
      return res.data;
    });
  }

  static submitAnswers(id, data) {
    return request.post("/v1/quiz-results/" + id + "/submit-answers", data).then(res => {
      return res.data;
    });
  }

  static getResults(id) {
    return request.get("/v1/quiz-results/" + id + "/results").then(res => {
      return res.data;
    });
  }
}

export default QuizResultService;
