import request from "src/utils/request";

class MediaService {
  static upload(data) {
    return request
      .post("/upload", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => res.data);
  }
}

export default MediaService;
