import request from "../utils/request";

class DocumentService {
  static getOne(documentId, params) {
    return request
      .get(`/documents/${documentId}`, {
        params,
      })
      .then((res) => res.data.data);
  }
}

export default DocumentService;
