import request from "src/utils/request";

class QuestionService {
  static create(data) {
    return request.post("/questions", data).then((res) => res.data.data);
  }
  static update(id, data) {
    return request.put(`/questions/${id}`, data).then((res) => res.data.data);
  }
  static delete(id) {
    return request.delete(`/questions/${id}`).then((res) => res.data.data);
  }
}

export default QuestionService;
