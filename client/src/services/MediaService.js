import request from "src/utils/request";

class MediaService {
  static uploadLocal(data) {
    return request
      .post("/auth/media/upload-local", data, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(res => res.data.data);
  }
  static uploadS3(data) {
    return request
      .post("/auth/media/upload-s3", data, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(res => res.data.data);
  }
  static deleteLocal(fileName) {
    return request.delete(`/auth/media/delete-image-local/${fileName}`).then(res => res.data.data);
  }
  static deleteS3(fileName) {
    return request.delete(`/auth/media/delete-image-S3/${fileName}`).then(res => res.data.data);
  }
}

export default MediaService;
