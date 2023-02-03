/* eslint-disable no-unused-vars */
import request from "./apiRequest";

class DocumentService {
  static getAll(params) {
    return request.get("/v1/auth/documents", { params: params }).then(res => {
      return res.data;
    });
  }

  static getAllWithoutAuth(params) {
    return request.get("/v1/documents", { params: params }).then(res => {
      return res.data;
    });
  }

  static getOne(id) {
    return request.get("/v1/auth/documents/" + id).then(res => {
      return res.data;
    });
  }

  static getOneWithoutAuth(id) {
    return request.get("/v1/documents/" + id).then(res => {
      return res.data;
    });
  }

  static create(data) {
    return request.post("/v1/auth/documents", data).then(res => {
      return res.data;
    });
  }

  static update(id, data) {
    return request.put("/v1/auth/documents/" + id, data).then(res => {
      return res.data;
    });
  }

  static delete(id) {
    return request.delete("/v1/auth/documents/" + id).then(res => {
      return res.data;
    });
  }
}

export default DocumentService;
