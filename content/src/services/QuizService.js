import request from "../utils/request";

class QuizService {
  static getOne(quizId, params) {
    return request
      .get(`/quizzes/${quizId}`, {
        params,
      })
      .then((res) => res.data.data);
  }
}

export default QuizService;
