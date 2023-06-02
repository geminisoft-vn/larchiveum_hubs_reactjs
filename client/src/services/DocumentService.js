import request from "src/utils/request";

class DocumentService {
  static getOne(id) {
    return request.get(`/documents/${id}`).then((res) => res.data.data);
  }
  static create(data) {
    return request.post("/documents", data).then((res) => res.data.data);
  }
  static update(id, data) {
    return request.put(`/documents/${id}`, data).then((res) => res.data.data);
  }
  static delete(id) {
    return request.delete(`/documents/${id}`).then((res) => res.data.data);
  }
}

export default DocumentService;
